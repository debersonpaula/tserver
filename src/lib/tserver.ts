/*
* TServer unit
* descr: creates basic server with Node + Express + Mongoose + BodyParser
* scope: only server
* author: dpaula
* https://github.com/debersonpaula
*/

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';


//server class
class TServer{
    //components
    protected app: express.Application;
    protected objects: Array<TServerObject>;
    //server options
    public Options: any;

    //constructor
    constructor(){
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.objects = [];
        this.Options = {
            port: 0
        };
    }

    public Log = function(msg:string){
        console.log(msg);
    }

    //add object to objects list
    public Add(obj: TServerObject){
        this.objects.push(obj);
    }

    //find object in objects list
    public Find(classtype: typeof TServerObject):any
    {
        var buf = undefined;
        for(var i in this.objects){
            if (this.objects[i].constructor == classtype){
                buf = this.objects[i];
                break;
            }
        }
        return buf;
    }

    //load config json file
    public LoadConfig(filename:string){
        //load json file to obj
        var obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
        //if opt exists in obj, assign to the options
        for(var opt in this.Options){
            if(obj[opt]){
                this.Options[opt] = obj[opt];
            }
        }
        //check for static routes
        if(obj.static){
            for(var route in obj.static){
                this.AddStatic(obj.static[route]);
            }
        }
    }

    //add static route
    public AddStatic(path:string){
        this.app.use(express.static(path));
    }

    //add route to specific file
    public AddRouteToFile(uri:string,filename:string){
        this.app.get(uri, function(req, res){
            res.sendFile(filename);
        });
    }

    //add router handler
    public AddRouter(uri:string): express.IRoute{
        return this.app.route(uri);
    }

    //server initializator
    public Listen(ListenPort?:number){
        var opts = this.Options;
        var self = this;
        if (!opts.port){
            self.Log('HTTP Port was not been assigned to options');
        }else{
            ListenPort = opts.port || ListenPort;
 
            //run objects DoBeforeListen
            this.objects.forEach(element => {
                element.DoBeforeListen();
            });

            this.app.listen(ListenPort,function(err:any){ 
                if (err){
                    self.Log(`HTTP Server can't be active on port ${opts.port}`) 
                    throw err;
                }else{
                    self.Log(`HTTP Server active on port ${opts.port}`) 
                }
            });

        }
    }
}

// Server Object => to handle child objects for the server
class TServerObject{
    protected SOwner: TServer;
    constructor(AOwner:TServer){
        this.SOwner = AOwner;
        AOwner.Add(this);
    }
    DoBeforeListen(){}
}

export {TServer,TServerObject};