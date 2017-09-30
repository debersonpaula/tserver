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
        var content = new TModel(this.SOwner);
        content.Name = ModelName;
        content.Schema = new mongoose.Schema(Schema);
        content.Model = mongoose.model(ModelName,content.Schema);
        this.models.push(content);
    }

    SearchModel(ModelName: string): TModel
    {
        var result: any = undefined;
        for (var i in this.models){
            if (this.models[i].Name === ModelName){
                result = this.models[i];
                break;
            }
        }
        return result;
    }
}

class TModel extends TServerObject{
    //components
    public Name: string;
    public Schema: mongoose.Schema;
    public Model: mongoose.Model<any>;
    //method to find
    public Find(conditions: Object, callback?: (result:any[])=>void ){
        var self = this;
        self.Model.find(conditions,function(err:any,res:any[]){ self.ResultOperation(err,res,callback); });
    }
    //method to save
    public Save(data: Object, callback?: (result:any[])=>void ){
        var self = this;
        var savemodel: mongoose.Document = new self.Model(data);
        savemodel.save(function(err:any,res:any){ self.ResultOperation(err,res,callback); });
    }
    //method to return result of mongoose operation
    private ResultOperation(err:any,res:any,callback?: Function){
        var result = false;
        if (err){
            this.SOwner.Log(err);
        }else{
            result = res;
        }
        callback && callback(result);
    }
}

export {MServer,TModel};