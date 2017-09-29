/*
* MServer unit
* descr: creates connection to mongodb
* scope: only server
* author: dpaula
* https://github.com/debersonpaula
*/

import * as mongoose from 'mongoose';
import {TServer,TServerObject} from './tserver';

class MServer extends TServerObject{

    protected db: mongoose.Connection;

    constructor(AOwner:TServer){
        super(AOwner);
        AOwner.Options.mongoURL = "";
    }

    DoBeforeListen(){
        const dbURI = this.SOwner.Options.mongoURL;
        if (dbURI){
            mongoose.connection.on('connected',function(){ console.log('Connected to MongoDB, URL = ' + dbURI); });
            mongoose.connection.on('error',function(err){ console.log('Not connected to MongoDB => Error: ' + err); });
            mongoose.connection.on('disconnected',function(){ console.log('Disconnected to MongoDB, URL = '  + dbURI); });
            mongoose.connection.on('open',function(){ console.log('Connection with MongoDB is open.'); });
            mongoose.connect(dbURI,{useMongoClient: true});
        }
    }
}

export {MServer};