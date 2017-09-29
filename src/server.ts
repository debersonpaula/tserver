//imports
import {TServer} from './lib/tserver';
import {MServer} from './lib/mserver';

//create servers
const Server = new TServer;         //express server
const MongoDB = new MServer(Server);//mongo connection

//load configuration file
Server.LoadConfig('./server.json');

//start server
Server.Listen();