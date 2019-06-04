"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Base_1 = __importDefault(require("./Base"));
var Provider = /** @class */ (function (_super) {
    __extends(Provider, _super);
    function Provider(obj) {
        if (obj === void 0) { obj = {}; }
        var _this = _super.call(this, obj) || this;
        _this.name = obj.name || "";
        _this.username = obj.username || "";
        _this.password = obj.password || "";
        _this.email = obj.email || "";
        return _this;
    }
    return Provider;
}(Base_1.default));
exports.default = Provider;
