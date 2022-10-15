import { colors } from "./colors";
export declare enum logLevel {
    DEBUG = "\u001B[90m",
    INFO = "\u001B[97m",
    WARN = "\u001B[33m",
    ERROR = "\u001B[91m"
}
/**
 * Base log function, log with any color
 * @param message Message
 * @param color color or logLevel
 */
export declare function log(message: any, color: colors | logLevel): void;
/**
 * Log a debug message
 * @param message Message
 */
export declare function debug(message: any): void;
/**
 * Log an debug message
 * @param message Message
 */
export declare function info(message: any): void;
/**
 * Log a warning message
 * @param message Message
 */
export declare function warn(message: any): void;
/**
 * Log an error message
 * @param message Message
 */
export declare function error(message: any): void;
