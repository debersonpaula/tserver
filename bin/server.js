"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//imports
var tserver_1 = require("./lib/tserver");
var mserver_1 = require("./lib/mserver");
var Server = new tserver_1.TServer;
var MongoDB = new mserver_1.MServer(Server);
Server.LoadConfig('./server.json');
Server.Listen();
