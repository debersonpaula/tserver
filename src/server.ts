import {TServer} from './lib/nemb';
const Server = new TServer;
Server.LoadConfig('./server.json');
Server.Listen();