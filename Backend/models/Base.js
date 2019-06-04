"use strict";
/**
 * @name Base
 * @description This is the base configuration of every controller
 *              It has the standard methods that will be overwritten on demand
 *              for each class
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Base = /** @class */ (function () {
    function Base(obj) {
        this._id = obj._id || null;
        this.deleted = obj.deleted || false;
    }
    return Base;
}());
exports.default = Base;
