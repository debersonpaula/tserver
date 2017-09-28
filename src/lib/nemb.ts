/*
* NEMB Server unit
* descr: creates basic server with Node + Express + Mongoose + BodyParser
* scope: only server
* author: dpaula
* https://github.com/debersonpaula
*/

import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';


class TSOptions{
    port: number;
    mongoURL: string;
}

//server class
class TServer{
    //components
    protected app: express.Application;
    protected db: mongoose.Connection;

    //database properties
    public DatabaseURL: string;

    //server options
    //public Options: TSOptions;
    public Options: any;

    //constructor
    constructor(){
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        this.Options = {
            port: 0,
            mongoURL: ""
        };
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

    //server initializator
    public Listen(ListenPort?:number){
        var opts = this.Options;
        if (!opts.port){
            console.log('HTTP Port was not been assigned to options');
        }else{
            ListenPort = opts.port || ListenPort;
            const dbURI = this.DatabaseURL;
            if (dbURI){
                mongoose.connection.on('connected',function(){ console.log('Connected to MongoDB, URL = ' + dbURI); });
                mongoose.connection.on('error',function(err){ console.log('Not connected to MongoDB => Error: ' + err); });
                mongoose.connection.on('disconnected',function(){ console.log('Disconnected to MongoDB, URL = '  + dbURI); });
                mongoose.connection.on('open',function(){ console.log('Connection with MongoDB is open.'); });
                mongoose.connect(dbURI,{useMongoClient: true});
            }
            this.app.listen(ListenPort,function(err:any){ 
                if (err){
                    console.log(`HTTP Server can't be active on port ${opts.port}`) 
                    throw err;
                }else{
                    console.log(`HTTP Server active on port ${opts.port}`) 
                }
            });

        }
    }
}

export {TServer};