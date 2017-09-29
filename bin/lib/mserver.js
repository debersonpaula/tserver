"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tserver_1 = require("./tserver");
var MServer = /** @class */ (function (_super) {
    __extends(MServer, _super);
    //constructor
    function MServer(AOwner) {
        var _this = _super.call(this, AOwner) || this;
        AOwner.Options.mongoURL = "";
        return _this;
    }
    return MServer;
}(tserver_1.TServerObject));
exports.MServer = MServer;
