"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nemb_1 = require("./lib/nemb");
var Server = new nemb_1.TServer;
Server.LoadConfig('./server.json');
Server.Listen();
