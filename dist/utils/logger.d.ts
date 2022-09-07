import { TextBasedChannel } from "discord.js";
export declare enum logLevel {
    DEBUG = "\u001B[90m",
    INFO = "\u001B[97m",
    WARN = "\u001B[33m",
    ERROR = "\u001B[91m"
}
export declare function log(message: any, color: logLevel): void;
export declare function debug(message: any): void;
export declare function info(message: any): void;
export declare function warn(message: any): void;
export declare function error(message: any, channel?: TextBasedChannel): void;
