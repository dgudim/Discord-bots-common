import { colors, parse, wrap } from "./colors";

export enum logLevel {
    DEBUG = colors.GRAY,
    INFO = colors.WHITE,
    WARN = colors.YELLOW,
    ERROR = colors.LIGHT_RED
}

/**
 * Base log function, log with any color
 * @param message Message
 * @param color color or logLevel
 */
export function log(message: any, color: colors | logLevel) {
    switch (color) {
        case logLevel.DEBUG:
        case logLevel.INFO:
        default:
            console.log(parse(wrap(message, color)));
            break;
        case logLevel.WARN:
            console.warn(parse(wrap(message, color)));
            break;
        case logLevel.ERROR:
            console.error(parse(wrap(message, color)));
            break;
    }
}

/**
 * Log a debug message
 * @param message Message
 */
export function debug(message: any) {
    log(message, logLevel.DEBUG);
}

/**
 * Log an debug message
 * @param message Message
 */
export function info(message: any) {
    log(message, logLevel.INFO);
}

/**
 * Log a warning message
 * @param message Message
 */
export function warn(message: any) {
    log(message, logLevel.WARN);
}

/**
 * Log an error message
 * @param message Message
 */
export function error(message: any) {
    log(message, logLevel.ERROR);
}