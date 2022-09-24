import { ColorResolvable, CommandInteraction, Message, MessagePayload, EmbedBuilder, TextBasedChannel, ChatInputCommandInteraction, Snowflake, OAuth2Guild, BaseGuild, User, MessagePayloadOption } from "discord.js";
import { JsonDB } from "node-json-db";
export declare const eight_mb: number;
declare type nullableString = string | undefined | null;
export declare function isDirectory(path: string): boolean;
export declare function getFileName(file: string): string;
export declare function normalize(str: nullableString): string;
export declare function getBaseLog(x: number, y: number): number;
export declare function trimStringArray(arr: string[]): string[];
export declare function isUrl(url: nullableString): Promise<boolean>;
export declare function getFileHash(file: string): Promise<string>;
export declare function getValueIfExists(db: JsonDB, path: string): Promise<any>;
export declare function limitLength(str: string, max_length: number): string;
/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
export declare function hsvToRgb(h: number, s: number, v: number): [red: number, green: number, blue: number];
export declare function perc2color(perc: number): ColorResolvable;
declare type MessageContents = string | EmbedBuilder | MessagePayload | MessagePayloadOption;
export declare function channelToString(channel: TextBasedChannel, parse_guild?: boolean): string;
export declare function guildToString(guild: [Snowflake, OAuth2Guild] | BaseGuild | null): string;
export declare function userToString(user: User): string;
export declare function sendToChannel(channel: TextBasedChannel | null, content: MessageContents, log_asError?: boolean): Promise<void>;
export declare function messageReply(message: Message, content: string): Promise<void>;
export declare function safeReply(interaction: CommandInteraction, content: MessageContents, ephemeral?: boolean): Promise<void>;
export declare function getAllUrlFileAttachements(interaction: ChatInputCommandInteraction, url_key: string, attachement_key: string, check_if_image?: boolean): Promise<string[]>;
export declare function walk(dir: string): string[];
export declare function getSimpleEmbed(title: string, description: string, color: ColorResolvable): EmbedBuilder;
export declare function getDateTime(): string;
export declare function clamp(num: number, min: number, max: number): number;
export declare function sleep(ms: number): Promise<unknown>;
export declare function normalizeTags(tags: string): string;
export declare function stripUrlScheme(url: string): string;
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
export declare function isPngOrJpg(name: string | null | undefined): boolean;
export declare function isImageUrlType(type: string): boolean;
export declare function isPngOrJpgUrlType(type: string): boolean;
export {};
