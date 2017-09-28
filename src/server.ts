import {TServer} from './lib/tserver';
const Server = new TServer;
Server.LoadConfig('./server.json');
Server.Listen();