"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.warn = exports.info = exports.debug = exports.log = exports.logLevel = void 0;
const colors_1 = require("./colors");
var logLevel;
(function (logLevel) {
    logLevel["DEBUG"] = "\u001B[90m";
    logLevel["INFO"] = "\u001B[97m";
    logLevel["WARN"] = "\u001B[33m";
    logLevel["ERROR"] = "\u001B[91m";
})(logLevel = exports.logLevel || (exports.logLevel = {}));
function log(message, color) {
    switch (color) {
        case logLevel.DEBUG:
        case logLevel.INFO:
        default:
            console.log((0, colors_1.parse)((0, colors_1.wrap)(message, color)));
            break;
        case logLevel.WARN:
            console.warn((0, colors_1.parse)((0, colors_1.wrap)(message, color)));
            break;
        case logLevel.ERROR:
            console.error((0, colors_1.parse)((0, colors_1.wrap)(message, color)));
            break;
    }
}
exports.log = log;
function debug(message) {
    log(message, logLevel.DEBUG);
}
exports.debug = debug;
function info(message) {
    log(message, logLevel.INFO);
}
exports.info = info;
function warn(message) {
    log(message, logLevel.WARN);
}
exports.warn = warn;
function error(message) {
    log(message, logLevel.ERROR);
}
exports.error = error;
