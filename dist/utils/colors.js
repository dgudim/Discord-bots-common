"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.wrap = exports.colors = void 0;
const colorEscapeStr = "\x1b[";
var colors;
(function (colors) {
    colors["PREVIOUS"] = "\u001B[30m";
    colors["DEFAULT"] = "\u001B[39m";
    colors["WHITE"] = "\u001B[97m";
    colors["GRAY"] = "\u001B[90m";
    colors["BLUE"] = "\u001B[34m";
    colors["LIGHT_BLUE"] = "\u001B[94m";
    colors["LIGHTER_BLUE"] = "\u001B[96m";
    colors["CYAN"] = "\u001B[36m";
    colors["LIGHT_RED"] = "\u001B[91m";
    colors["RED"] = "\u001B[31m";
    colors["LIGHT_YELLOW"] = "\u001B[93m";
    colors["YELLOW"] = "\u001B[33m";
    colors["LIGHT_GREEN"] = "\u001B[92m";
    colors["GREEN"] = "\u001B[32m";
    colors["LIGHT_PURPLE"] = "\u001B[95m";
    colors["PURPLE"] = "\u001B[35m";
})(colors = exports.colors || (exports.colors = {}));
function wrap(message, color) {
    return `${color}${message}${colors.PREVIOUS}`;
}
exports.wrap = wrap;
function getPreviousColor(str, steps_behind) {
    const split = str.split(colorEscapeStr);
    if (split.length > steps_behind) {
        const lastColor = split[split.length - 1].substring(0, 2);
        const lastButOneColor = split[split.length - 2].substring(0, 2);
        const targetColor = split[split.length - steps_behind].substring(0, 2);
        if (lastColor == "30") {
            return getPreviousColor(str.substring(0, str.lastIndexOf(colors.PREVIOUS)), steps_behind + 1);
        }
        if (lastButOneColor == "30" || targetColor == "30") {
            return getPreviousColor(str.substring(0, str.lastIndexOf(colors.PREVIOUS)), steps_behind);
        }
        return `${colorEscapeStr}${targetColor}m`;
    }
    return colors.DEFAULT;
}
function parse(str) {
    let index;
    while ((index = str.lastIndexOf(colors.PREVIOUS)) >= 0) {
        const left_part = str.substring(0, index);
        str = left_part + getPreviousColor(left_part, 2) + str.substring(index + colors.PREVIOUS.length);
    }
    return str;
}
exports.parse = parse;
