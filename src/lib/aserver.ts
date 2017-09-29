/*
* AServer unit
* descr: authentication plugin
* scope: only server
* author: dpaula
* https://github.com/debersonpaula
*/
import { Request, Response } from "express";
import {TServer,TServerObject} from './tserver';

class AServer extends TServerObject{
    DoBeforeListen(){
        this.SOwner.AddRouter('/register')
            .get(this.RouteGetRegister)
            .post(this.RoutePostRegister);
    }
    private RouteGetRegister(req:Request,res:Response){
        res.send('RouteGetRegister');
    }
    private RoutePostRegister(req:Request,res:Response){
        res.send('RoutePostRegister');
    }
}

export {AServer};