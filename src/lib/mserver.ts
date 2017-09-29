/*
* MServer unit
* descr: creates connection to mongodb
* scope: only server
* dependencies: tserver
* author: dpaula
* https://github.com/debersonpaula
*/

import * as mongoose from 'mongoose';
import {TServer,TServerObject} from './tserver';

class MServer extends TServerObject{

    protected db: mongoose.Connection;
    protected models: Array<TModel>;

    constructor(AOwner:TServer){
        super(AOwner);
        AOwner.Options.mongoURL = "";
        this.models = [];
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

    AddModel(Schema:mongoose.SchemaDefinition,ModelName:string){
        var content = new TModel;
        content.Name = ModelName;
        content.Schema = new mongoose.Schema(Schema);
        content.Model = mongoose.model(ModelName,content.Schema);
        this.models.push(content);
    }

    SearchModel(ModelName: string): TModel | undefined
    {
        this.models.forEach(element => {
            if (element.Name === ModelName)
                return element;
        });
        return;
    }
}

class TModel{
    Name: string;
    Schema: mongoose.Schema;
    Model: mongoose.Model<any>;
}

export {MServer};