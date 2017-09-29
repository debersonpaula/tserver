import * as mongoose from 'mongoose';
import {TServer,TServerObject} from './tserver';

class MServer extends TServerObject{
    //components
    protected db: mongoose.Connection;
    //constructor
    constructor(AOwner:TServer){
        super(AOwner);
        AOwner.Options.mongoURL = "";
    }
}

export {MServer};