/*
* AServer unit
* descr: authentication plugin
* scope: only server
* dependencies: tserver, mserver
* author: dpaula
* https://github.com/debersonpaula
*/
import { Request, Response } from "express";
import {TServer,TServerObject} from './tserver';
import {MServer} from './mserver';

class AServer extends TServerObject{

    private db: MServer;
    
    constructor(AOwner:TServer){
        super(AOwner);
    }
    DoBeforeListen(){
        this.SOwner.AddRouter('/register')
            .get(this.RouteGetRegister)
            .post(this.RoutePostRegister);
        this.db = this.SOwner.Find(MServer);
        this.RegisterStandardModels();
    }
    private RouteGetRegister(req:Request,res:Response){
        res.send(DefAStandard.StandardViews.RouteGetRegister);
    }
    private RoutePostRegister(req:Request,res:Response){
        res.send('RoutePostRegister');
    }
    private RegisterStandardModels(){
        if (this.db){
            DefAStandard.StandardModels.forEach(model => {
                this.db.AddModel(model.Schema,model.Name);
            });
        }
    }
}

export var DefAStandard = {
    StandardViews:{
        RouteGetRegister:`
        <form action="/register" method="post">
            <div>
                <label>Username:</label>
                <input type="text" name="username"/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="userpass"/>
            </div>
            <div>
                <label>Confirm Password:</label>
                <input type="password" name="userpass2"/>
            </div>
            <div>
                <input type="submit" value="Log In"/>
            </div>
        </form>
        `
    },
    StandardModels:[
        {
            Name: 'dbUsers',
            Schema: {
                username:{type:String,default:''},
                userpass:{type:String,default:''}
            }
        }
    ]
};

export {AServer};