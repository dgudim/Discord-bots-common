import { logLevel } from "./logger";

const colorEscapeStr = "\x1b[";

/** enum mapping to console colors */ 
export enum colors {
    PREVIOUS = "\x1b[30m",
    DEFAULT = "\x1b[39m",

    WHITE = "\x1b[97m",
    GRAY = "\x1b[90m",

    BLUE = "\x1b[34m",
    LIGHT_BLUE = "\x1b[94m",
    LIGHTER_BLUE = "\x1b[96m",
    CYAN = "\x1b[36m",

    LIGHT_RED = "\x1b[91m",
    RED = "\x1b[31m",

    LIGHT_YELLOW = "\x1b[93m",
    YELLOW = "\x1b[33m",

    LIGHT_GREEN = "\x1b[92m",
    GREEN = "\x1b[32m",

    LIGHT_PURPLE = "\x1b[95m",
    PURPLE = "\x1b[35m"
}

/**
 * function to colorize a part of the message
 * 
 * @param message input message
 * @param color target color
 * @return wrapped message, pass through `parse` before printing
 */
export function wrap(message: any, color: colors | logLevel) {
    return `${color}${message}${colors.PREVIOUS}`;
}

function getPreviousColor(str: string, steps_behind: number) : string {
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

/**
 * parse the string containing colors.PREVIOUS replacing it with appropriate colors
 * 
 * @param str input string
 * @returns parsed string
 */
export function parse(str: string) {
    let index;
    while ((index = str.lastIndexOf(colors.PREVIOUS)) >= 0) {
        const left_part = str.substring(0, index);
        str = left_part + getPreviousColor(left_part, 2) + str.substring(index + colors.PREVIOUS.length);
    }
    return str;
}