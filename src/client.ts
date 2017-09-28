import {TestClass} from './lib/test';

var app = new TestClass;
app.name = 'Write from Node script';

document.write( app.getName() );