(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nodeModules = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("./lib/test");
var app = new test_1.TestClass;
app.name = 'Write from Node script';
document.write(app.getName());

},{"./lib/test":2}],2:[function(require,module,exports){
"use strict";
/*
* Test unit
* descr: tests
* scope: server / client
* author: dpaula
* https://github.com/debersonpaula
*/
Object.defineProperty(exports, "__esModule", { value: true });
var TestClass = /** @class */ (function () {
    function TestClass() {
    }
    TestClass.prototype.getName = function () {
        return this.name;
    };
    return TestClass;
}());
exports.TestClass = TestClass;
var TestClass2 = /** @class */ (function () {
    function TestClass2() {
    }
    TestClass2.prototype.getName = function () {
        return this.name;
    };
    return TestClass2;
}());
exports.TestClass2 = TestClass2;

},{}]},{},[1])(1)
});