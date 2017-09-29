"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("./lib/test");
var app = new test_1.TestClass;
app.name = 'Write from Node script';
document.write(app.getName());
