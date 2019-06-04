"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var Notification = /** @class */ (function () {
    function Notification() {
    }
    /**
     * @description Prints highlighted message in console
     * @param text
     */
    Notification.header = function (text) {
        console.log(this.getDate() + "INFO: " + chalk_1.default.white.bgGreen(text));
    };
    /**
     * @description Prints normal message in console
     * @param text
     */
    Notification.info = function (text) {
        console.log(this.getDate() + "INFO: " + chalk_1.default.cyan(text));
    };
    /**
     * @description Prints success message in console
     * @param text
     */
    Notification.success = function (text) {
        console.log(this.getDate() + "INFO: " + chalk_1.default.green(text));
    };
    /**
     * @description Prints warning message in console
     * @param text String
     */
    Notification.warn = function (text) {
        console.log(this.getDate() + "WARNING: " + chalk_1.default.yellow(text));
    };
    /**
     * @description Prints error message in console
     * @param text  String
     */
    Notification.error = function (text) {
        console.log(this.getDate() + "SEVERE: " + chalk_1.default.red(text));
    };
    /**
     * @description Prints fatal error in console
     * @param text String
     */
    Notification.fatal = function (text) {
        console.log(this.getDate() + "SEVERE: " + chalk_1.default.white.bgRed(text));
    };
    Notification.getDate = function () {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        return ("[ " +
            date.toISOString().substring(0, 10) +
            hours +
            ":" +
            minutes +
            ":" +
            seconds +
            " ] ");
    };
    return Notification;
}());
exports.default = Notification;
