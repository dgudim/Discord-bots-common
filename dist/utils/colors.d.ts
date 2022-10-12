import { logLevel } from "./logger";
/** enum mapping to console colors */
export declare enum colors {
    PREVIOUS = "\u001B[30m",
    DEFAULT = "\u001B[39m",
    WHITE = "\u001B[97m",
    GRAY = "\u001B[90m",
    BLUE = "\u001B[34m",
    LIGHT_BLUE = "\u001B[94m",
    LIGHTER_BLUE = "\u001B[96m",
    CYAN = "\u001B[36m",
    LIGHT_RED = "\u001B[91m",
    RED = "\u001B[31m",
    LIGHT_YELLOW = "\u001B[93m",
    YELLOW = "\u001B[33m",
    LIGHT_GREEN = "\u001B[92m",
    GREEN = "\u001B[32m",
    LIGHT_PURPLE = "\u001B[95m",
    PURPLE = "\u001B[35m"
}
/**
 * function to colorize a part of the message
 *
 * @param message input message
 * @param color target color
 * @return wrapped message, pass through `parse` before printing
 */
export declare function wrap(message: any, color: colors | logLevel): string;
/**
 * parse the string containing colors.PREVIOUS replacing it with appropriate colors
 *
 * @param str input string
 * @returns parsed string
 */
export declare function parse(str: string): string;
