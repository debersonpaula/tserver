"use strict";
/*
* TServer unit
* descr: creates basic server with Node + Express + Mongoose + BodyParser
* scope: only server
* author: dpaula
* https://github.com/debersonpaula
*/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
//server class
var TServer = /** @class */ (function () {
    //constructor
    function TServer() {
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.objects = [];
        this.Options = {
            port: 0
        };
    }
    //load config json file
    TServer.prototype.LoadConfig = function (filename) {
        //load json file to obj
        var obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
        //if opt exists in obj, assign to the options
        for (var opt in this.Options) {
            if (obj[opt]) {
                this.Options[opt] = obj[opt];
            }
        }
        //check for static routes
        if (obj.static) {
            for (var route in obj.static) {
                this.AddStatic(obj.static[route]);
            }
        }
    };
    //add static route
    TServer.prototype.AddStatic = function (path) {
        this.app.use(express.static(path));
    };
    //add route to specific file
    TServer.prototype.AddRouteToFile = function (uri, filename) {
        this.app.get(uri, function (req, res) {
            res.sendFile(filename);
        });
    };
    //server initializator
    TServer.prototype.Listen = function (ListenPort) {
        var opts = this.Options;
        if (!opts.port) {
            console.log('HTTP Port was not been assigned to options');
        }
        else {
            ListenPort = opts.port || ListenPort;
            /*
            const dbURI = opts.mongoURL;
            if (dbURI){
                mongoose.connection.on('connected',function(){ console.log('Connected to MongoDB, URL = ' + dbURI); });
                mongoose.connection.on('error',function(err){ console.log('Not connected to MongoDB => Error: ' + err); });
                mongoose.connection.on('disconnected',function(){ console.log('Disconnected to MongoDB, URL = '  + dbURI); });
                mongoose.connection.on('open',function(){ console.log('Connection with MongoDB is open.'); });
                mongoose.connect(dbURI,{useMongoClient: true});
            }
            */
            this.app.listen(ListenPort, function (err) {
                if (err) {
                    console.log("HTTP Server can't be active on port " + opts.port);
                    throw err;
                }
                else {
                    console.log("HTTP Server active on port " + opts.port);
                }
            });
        }
    };
    return TServer;
}());
exports.TServer = TServer;
// Server Object => to handle child objects for the server
var TServerObject = /** @class */ (function () {
    function TServerObject(AOwner) {
        this.SOwner = AOwner;
    }
    return TServerObject;
}());
exports.TServerObject = TServerObject;
