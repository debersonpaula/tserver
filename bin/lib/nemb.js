"use strict";
/*
* NEMB Server unit
* descr: creates basic server with Node + Express + Mongoose + BodyParser
* scope: only server
* author: dpaula
* https://github.com/debersonpaula
*/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var fs = require("fs");
var TSOptions = /** @class */ (function () {
    function TSOptions() {
    }
    return TSOptions;
}());
//server class
var TServer = /** @class */ (function () {
    //constructor
    function TServer() {
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.Options = {
            port: 0,
            mongoURL: ""
        };
    }
    TServer.prototype.LoadConfig = function (filename) {
        //load json file to obj
        var obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
        for (var opt in this.Options) {
            if (obj[opt]) {
                //if opt exists in obj, assign to the options
                this.Options[opt] = obj[opt];
            }
        }
        //check for static routes
        //if(obj['static']){
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
            var dbURI_1 = this.DatabaseURL;
            if (dbURI_1) {
                mongoose.connection.on('connected', function () { console.log('Connected to MongoDB, URL = ' + dbURI_1); });
                mongoose.connection.on('error', function (err) { console.log('Not connected to MongoDB => Error: ' + err); });
                mongoose.connection.on('disconnected', function () { console.log('Disconnected to MongoDB, URL = ' + dbURI_1); });
                mongoose.connection.on('open', function () { console.log('Connection with MongoDB is open.'); });
                mongoose.connect(dbURI_1, { useMongoClient: true });
            }
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
