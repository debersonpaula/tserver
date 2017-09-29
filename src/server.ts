//imports
import {TServer} from './lib/tserver';
import {MServer} from './lib/mserver';
import {AServer} from './lib/aserver';

//create servers
const Server = new TServer;         //express server
const MongoDB = new MServer(Server);//mongodb
const Auth = new AServer(Server);   //authentication

//load configuration file
Server.LoadConfig('./server.json');

//start server
Server.Listen();