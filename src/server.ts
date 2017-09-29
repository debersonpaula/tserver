//imports
import {TServer} from './lib/tserver';
import {MServer} from './lib/mserver';

const Server = new TServer;
const MongoDB = new MServer(Server);
Server.LoadConfig('./server.json');
Server.Listen();