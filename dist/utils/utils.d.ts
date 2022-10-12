import { ColorResolvable, CommandInteraction, Message, MessagePayload, EmbedBuilder, TextBasedChannel, ChatInputCommandInteraction, Snowflake, OAuth2Guild, BaseGuild, User, MessagePayloadOption } from "discord.js";
import { JsonDB } from "node-json-db";
export declare const eight_mb: number;
export declare type none = undefined | null;
export declare type nullableString = string | none;
/**
 * Check is path leads to a directory
 * @param path Directory/File path
 * @returns True if the path leads to a directory
 */
export declare function isDirectory(path: string | none): boolean;
/**
 * Check is path leads to a file
 * @param path Directory/File path
 * @returns True if the path leads to a file
 */
export declare function isFile(path: string | none): boolean;
/**
 * Get file name from path of url
 * @param file Path/Url
 * @returns The last part of the path or url
 */
export declare function getFileName(file: string): string;
/**
 * Trim and lowercase a string
 * @param str String to normalize
 * @returns Lowercased and trimmed string
 */
export declare function normalize(str: nullableString): string;
/**
 * Get the log of a number with the base `base`
 * @param base Base of the logarithm
 * @param number Input number
 * @returns The log with the base
 */
export declare function getBaseLog(base: number, number: number): number;
/**
 * Normalizes every element of the string array
 * @param arr Array to normalize
 * @returns Array with every value normalized
 */
export declare function normalizeStringArray(arr: string[]): string[];
/**
 * Check whether a given string is url
 * @param url Input url/not url
 * @returns Whether the input string is url
 */
export declare function isUrl(url: nullableString): Promise<boolean>;
/**
 * Get file blake3 hash
 * @param file Input file
 * @returns Blake3 hash
 */
export declare function getFileHash(file: string): Promise<string>;
/**
 * Get a value from a json database if it exists
 * @param db Json databse
 * @param path Key path
 * @returns The value if it exists
 */
export declare function getValueIfExists(db: JsonDB, path: string): Promise<any>;
/**
 * Limit the length of a string
 * @param str String to limit the length of
 * @param max_length Maximum length of the string
 * @returns Limited string, adding ... if it's too long
 */
export declare function limitLength(str: string, max_length: number): string;
/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   h       The hue
 * @param   s       The saturation
 * @param   v       The value
 * @returns The RGB representation
 */
export declare function hsvToRgb(h: number, s: number, v: number): [red: number, green: number, blue: number];
/**
 * Convert a percentage value to a gradient from red to green
 * @param perc Value in percent (0 - 100)
 * @returns Hex representation
 */
export declare function perc2color(perc: number): ColorResolvable;
declare type MessageContents = string | EmbedBuilder | MessagePayload | MessagePayloadOption;
/**
 * Сonvert message content to it's string representation
 * @param content Almost any message content from DiscordJS (Embed, string, Payload, etc.)
 * @returns String representation
 */
export declare function messageContentToString(content: MessageContents): string;
/**
 * Сonvert a text channel to it's string representation
 * @param channel Text channel from DiscordJS
 * @returns String representation
 */
export declare function channelToString(channel: TextBasedChannel, parse_guild?: boolean): string;
/**
 * Convert a guild to it's string representation
 * @param guild Guild from DiscordJS
 * @returns String representation
 */
export declare function guildToString(guild: [Snowflake, OAuth2Guild] | BaseGuild | null): string;
/**
 * Convert a user to it's string representation
 * @param user User from DiscordJS
 * @returns String representation
 */
export declare function userToString(user: User): string;
/**
 * Send a message to a text channel
 * @param channel Discord text channel
 * @param content Message contents
 * @param log_asError Whether to log to the console as error
 */
export declare function sendToChannel(channel: TextBasedChannel | none, content: MessageContents | none, log_asError?: boolean): Promise<void>;
/**
 * Reply to a message
 * @param message Message to reply to
 * @param content Reply content
 */
export declare function messageReply(message: Message, content: string): Promise<void>;
/**
 * Safely reply to an interaction (if already replied send to channel, if deferred replied edit reply)
 * @param interaction Interaction to reply to
 * @param content Reply content
 * @param ephemeral Whether the reply is only visible to sender
 */
export declare function safeReply(interaction: CommandInteraction | none, content: MessageContents, ephemeral?: boolean): Promise<void>;
/**
 * Gets url and attachement from an interaction
 * @param interaction Interaction to get attachement urls from
 * @param url_key Parameter key with url
 * @param attachement_key Parameter key with an attachement
 * @param check_if_image Whether to chek if urls point to an image
 */
export declare function getAllUrlFileAttachements(interaction: ChatInputCommandInteraction | none, url_key: string, attachement_key: string, check_if_image?: boolean): Promise<string[]>;
/**
 * Get all images from a directory recursively
 * @param dir Directory to walk
 * @returns List of images in a directory
 */
export declare function walk(dir: string): string[];
/**
 * Construct a simple embed
 * @param title Embed title
 * @param description Embed description
 * @param color Embed color
 * @returns Constructed embed
 */
export declare function getSimpleEmbed(title: string, description: string, color: ColorResolvable): EmbedBuilder;
/**
 * @returns Current date and time
 */
export declare function getDateTime(): string;
/**
 * Convert seconds to days, hours, minutes and seconds
 * @param seconds Time in seconds
 * @returns Time in days, hours, minutes and seconds
 */
export declare function secondsToDhms(seconds: number): string;
/**
 * Clamp a value between to limits
 * @param num Number to clamp
 * @param min Lower limit
 * @param max Lower limit
 * @returns Clamped value
 */
export declare function clamp(num: number, min: number, max: number): number;
/**
 * Wait for some time
 * @param ms time in milliseconds
 */
export declare function sleep(ms: number): Promise<unknown>;
/**
 * Remove http/https scheme from a url
 * @param url a url
 * @returns url without http/https scheme
 */
export declare function stripUrlScheme(url: string): string;
/**
 * Fetch a url
 * @param url Url to fetch
 * @returns Fetch status
 */
export declare function fetchUrl(url: string): Promise<{
    ok: false;
    type: string;
    status: number;
    statusText: string;
} | {
    ok: true;
    type: string;
    status: number;
    statusText: string;
}>;
/**
 * Determine whether a file ai png or jpg
 * @param name file name
 * @returns
 */
export declare function isPngOrJpg(name: string | none): boolean;
/**
 * Determine whether url type is image
 * @param type file name
 * @returns
 */
export declare function isImageUrlType(type: string): boolean;
/**
 * Determine whether url type is png or jpg
 * @param type file name
 * @returns
 */
export declare function isPngOrJpgUrlType(type: string): boolean;
/**
 * Add a new element with a specified key and value to the Map, or overwrite if exists
 * @param map Target map
 * @param key Target key
 * @param value Value to put
 */
export declare function setOrAppendToMap<K, V>(map: Map<K, V[]>, key: K, value: V): void;
export {};
