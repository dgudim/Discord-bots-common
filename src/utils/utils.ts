import { ColorResolvable, CommandInteraction, Message, MessagePayload, EmbedBuilder, TextBasedChannel, ChatInputCommandInteraction, APIEmbed, Snowflake, OAuth2Guild, BaseGuild, User, MessagePayloadOption } from "discord.js";
import * as fs from "fs";

import { DataError, JsonDB } from "node-json-db";

import { blake3 } from "hash-wasm";

import { colors, wrap } from "./colors";
import { error, info, log, logLevel, warn } from "./logger";
import { Stream } from "stream";

export const eight_mb = 1024 * 1024 * 8;

export type none = undefined | null;
export type nullableString = string | none;

/**
 * Check is path leads to a directory
 * @param path Directory/File path
 * @returns True if the path leads to a directory
 */
export function isDirectory(path: string | none): boolean {
    return path ? (fs.existsSync(path) && fs.statSync(path).isDirectory()) : false;
}

/**
 * Check is path leads to a file
 * @param path Directory/File path
 * @returns True if the path leads to a file
 */
export function isFile(path: string | none): boolean {
    return path ? (fs.existsSync(path) && fs.statSync(path).isFile()) : false;
}

/**
 * Get file name from path of url
 * @param file Path/Url
 * @returns The last part of the path or url
 */
export function getFileName(file: string): string {
    const parts = file.split("/");
    const lastPIndex = file.indexOf("?");
    return parts[parts.length - 1].substring(0, lastPIndex == -1 ? file.length : lastPIndex);
}

/**
 * Trim and lowercase a string
 * @param str String to normalize
 * @returns Lowercased and trimmed string
 */
export function normalize(str: nullableString): string {
    return str ? str.toLowerCase().trim() : "";
}

/**
 * Get the log of a number with the base `base`
 * @param base Base of the logarithm
 * @param number Input number
 * @returns The log with the base
 */
export function getBaseLog(base: number, number: number): number {
    return Math.log(number) / Math.log(base);
}

/**
 * Normalizes every element of the string array
 * @param arr Array to normalize
 * @returns Array with every value normalized
 */
export function normalizeStringArray(arr: string[]): string[] {
    return arr.map(element => {
        return normalize(element);
    }).filter(element => {
        return element.length != 0;
    });
}

/**
 * Check whether a given string is url
 * @param url Input url/not url
 * @returns Whether the input string is url
 */
export async function isUrl(url: nullableString): Promise<boolean> {
    if (!url) {
        return false;
    }
    try {
        return (await fetch(url)).ok;
    } catch (e) {
        error(e);
        return false;
    }
}

/**
 * Get file blake3 hash
 * @param file Input file
 * @returns Blake3 hash
 */
export async function getFileHash(file: string): Promise<string> {
    return isFile(file) ? blake3(fs.readFileSync(file)) : "";
}

/**
 * Get a value from a json database if it exists
 * @param db Json databse
 * @param path Key path
 * @returns The value if it exists
 */
export async function getValueIfExists(db: JsonDB, path: string) {
    try {
        return await db.getData(path);
    } catch (e) {
        if (e instanceof DataError) {
            return "-";
        }
        throw e;
    }
}

/**
 * Limit the length of a string
 * @param str String to limit the length of
 * @param max_length Maximum length of the string
 * @returns Limited string, adding ... if it's too long
 */
export function limitLength(str: string, max_length: number): string {
    if (str.length > max_length) {
        str = str.slice(0, max_length - 3) + "...";
    }
    return str;
}

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
export function hsvToRgb(h: number, s: number, v: number): [red: number, green: number, blue: number] {
    let r = 0, g = 0, b = 0;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }

    return [r * 255, g * 255, b * 255];
}

/**
 * Convert a percentage value to a gradient from red to green
 * @param perc Value in percent (0 - 100)
 * @returns Hex representation
 */
export function perc2color(perc: number): ColorResolvable {
    let r, g;
    const b = 0;
    if (perc < 50) {
        r = 255;
        g = Math.round(5.1 * perc);
    }
    else {
        g = 255;
        r = Math.round(510 - 5.10 * perc);
    }
    const h = r * 0x10000 + g * 0x100 + b * 0x1;
    return ("#" + ("000000" + h.toString(16)).slice(-6)) as ColorResolvable;
}

function embedToString(embed: APIEmbed) {
    let str = "\n----------------------------------------------------------\n";

    if ("author" in embed || "title" in embed || "description" in embed) {
        str += `author: ${embed.author?.name} | title: ${embed.title} | description: ${embed.description}`;
        for (const field of embed.fields || []) {
            str += `\n${field.name}: ${field.value}`;
        }
        if (embed.footer) {
            str += `footer: ${embed.footer.text}, ${embed.footer.icon_url}`;
        }
    }

    str += "\n----------------------------------------------------------";
    return str;
}

function payloadToString(payload: MessagePayloadOption) {
    let str = payload.content || "";
    if (payload.files?.length) {
        str += "\nfiles";
        for (const file of payload.files) {
            if (typeof file === "string") {
                str += `\n${file}`;
            } else if ("attachment" in file) {
                // Attachment, AttachmentPayload and AttachmentBuilder

                let attachment = "stream";
                if (file.attachment instanceof Buffer) {
                    attachment = `buffer(${file.attachment.byteLength}`;
                } else if (typeof file.attachment === "string") {
                    attachment = file.attachment;
                }

                str += `\n${file.name}: ${file.description}, data: ${attachment}`;
            } else if (file instanceof Buffer) {
                str += `\nbuffer (${file.byteLength})`;
            } else if (file instanceof Stream) {
                str += `\nstream`;
            } else {
                const raw_file = file.toJSON();
                str += `\n ${raw_file.filename}: ${raw_file.description}, (url: ${raw_file.url}) (size ${raw_file.size})`;
            }
        }
    }
    if (payload.embeds?.length) {
        str += "\nembeds:";
        for (const embed of payload.embeds) {
            if (!("toJSON" in embed)) {
                str += embedToString(embed);
            } else {
                str += embedToString(embed.toJSON());
            }
        }
    }
    return str;
}

type MessageContents = string | EmbedBuilder | MessagePayload | MessagePayloadOption;

/**
 * Сonvert message content to it's string representation
 * @param content Almost any message content from DiscordJS (Embed, string, Payload, etc.)
 * @returns String representation
 */
export function messageContentToString(content: MessageContents) {
    if (content instanceof EmbedBuilder) {
        return embedToString(content.data);
    } else if (content instanceof MessagePayload) {
        return payloadToString(content.options);
    } else if (typeof content === "string") {
        return content;
    } else {
        // message payload option
        return payloadToString(content);
    }
}

/**
 * Сonvert a text channel to it's string representation
 * @param channel Text channel from DiscordJS
 * @returns String representation
 */
export function channelToString(channel: TextBasedChannel, parse_guild?: boolean) {
    if ("guild" in channel) {
        const guild_str = parse_guild ? `${guildToString(channel.guild)} ` : "";
        return `${guild_str}Channel: ${wrap(channel.name || "private " + channel, colors.GREEN)} (${wrap(channel.id, colors.GRAY)})`;
    } else {
        return `📜 Channel: DM with ${wrap(channel.recipient?.tag, colors.LIGHT_PURPLE)} (${wrap(channel.id, colors.GRAY)})`;
    }
}

/**
 * Convert a guild to it's string representation
 * @param guild Guild from DiscordJS
 * @returns String representation
 */
export function guildToString(guild: [Snowflake, OAuth2Guild] | BaseGuild | null): string {
    if (!guild) {
        return `🛡️ Guild: ${wrap("invalid", colors.RED)}`;
    }
    if (guild instanceof BaseGuild) {
        return `🛡️ Guild: ${wrap(guild.name, colors.PURPLE)} (${wrap(guild.id, colors.GRAY)})`;
    }
    return `🛡️ Guild: ${wrap(guild[1], colors.LIGHT_YELLOW)} (${wrap(guild[0], colors.GRAY)})`;
}

/**
 * Convert a user to it's string representation
 * @param user User from DiscordJS
 * @returns String representation
 */
export function userToString(user: User) {
    return `👤 User: ${wrap(user.tag, colors.LIGHT_RED)} (${wrap(user.id, colors.GRAY)})`;
}

/**
 * Send a message to a text channel
 * @param channel Discord text channel
 * @param content Message contents
 * @param log_asError Whether to log to the console as error
 */
export async function sendToChannel(channel: TextBasedChannel | none, content: MessageContents | none, log_asError?: boolean): Promise<void> {

    if (!content) {
        return warn(`❌ Can't send null content`);
    }

    if (!channel) {
        return warn(`❌ Can't send to null channel: ${messageContentToString(content)}`);
    }

    log(`${channelToString(channel, true)}: ${messageContentToString(content)}`, log_asError ? logLevel.ERROR : logLevel.INFO);

    try {
        if (content instanceof EmbedBuilder) {
            await channel.send({
                embeds: [content]
            });
        } else if (typeof content === "string") {
            const len = content.length;
            let pos = 0;
            while (pos < len) {
                const slice = content.slice(pos, pos + 1999);
                await channel.send(slice);
                pos += 1999;
            }
        } else if (content instanceof MessagePayload) {
            await channel.send(content);
        } else {
            // MessagePayloadOption
            await channel.send({
                embeds: content.embeds,
                files: content.files,
                options: content,
                content: content.content || "",
                components: content.components,
                allowedMentions: content.allowedMentions
            });
        }
    } catch (err) {
        error(`❌ Error sending to ${channelToString(channel, true) }, missing permissions? | error: ${err}`);
    }
}

/**
 * Reply to a message
 * @param message Message to reply to
 * @param content Reply content
 */
export async function messageReply(message: Message, content: string): Promise<void> {
    info(`${channelToString(message.channel, true)}: (reply to ${message.content}) -> ${content}`);
    await message.reply(content);
}

/**
 * Safely reply to an interaction (if already replied send to channel, if deferred replied edit reply)
 * @param interaction Interaction to reply to
 * @param content Reply content
 * @param ephemeral Whether the reply is only visible to sender
 */
export async function safeReply(interaction: CommandInteraction | none, content: MessageContents, ephemeral = false): Promise<void> {
    if (!interaction) {
        return info(`can't reply to null interraction with content: ${messageContentToString(content)}`);
    }
    if (interaction.replied) {
        await sendToChannel(interaction.channel, content);
    } else {
        const channel = interaction.channel;
        if (channel) {
            const deffered_str = interaction.deferred ? "edited reply" : "reply";

            info(`${channelToString(channel, true)}: (${deffered_str} to /${interaction.command?.name}) -> ${messageContentToString(content)}`);

            if (content instanceof EmbedBuilder) {
                if (interaction.deferred) {
                    await interaction.editReply({
                        embeds: [content]
                    });
                } else {
                    await interaction.reply({
                        embeds: [content],
                        ephemeral: ephemeral
                    });
                }
            } else if (typeof content === "string") {

                if (interaction.deferred) {
                    await interaction.editReply({
                        content: content
                    });
                } else {
                    await interaction.reply({
                        content: content,
                        ephemeral: ephemeral
                    });
                }
            } else if (content instanceof MessagePayload) {
                if (interaction.deferred) {
                    await interaction.editReply(content);
                } else {
                    await interaction.reply(content);
                }
            } else {
                // MessagePayloadOption
                if (interaction.deferred) {
                    await interaction.editReply({
                        embeds: content.embeds,
                        files: content.files,
                        options: content,
                        content: content.content,
                        components: content.components,
                        allowedMentions: content.allowedMentions
                    });
                } else {
                    await interaction.reply({
                        embeds: content.embeds,
                        files: content.files,
                        options: content,
                        content: content.content || "",
                        components: content.components,
                        allowedMentions: content.allowedMentions,
                        ephemeral: ephemeral,
                    });
                }
            }
        }
    }
}

/**
 * Gets url and attachement from an interaction
 * @param interaction Interaction to get attachement urls from
 * @param url_key Parameter key with url
 * @param attachement_key Parameter key with an attachement
 * @param check_if_image Whether to chek if urls point to an image
 */
export async function getAllUrlFileAttachements(interaction: ChatInputCommandInteraction | none, url_key: string, attachement_key: string, check_if_image?: boolean)
    : Promise<string[]> {

    if (!interaction) {
        info(`can't get attachements from a null interraction with keys: ${url_key} ${attachement_key}`);
        return [];
    }

    const arg_url = interaction.options.getString(url_key);
    const attachement_url = interaction.options.getAttachment(attachement_key)?.url || "";
    const channel = interaction.channel;

    const urls: string[] = [];
    if (await isUrl(arg_url)) {
        urls.push(arg_url!);
    } else if (arg_url) {
        await safeReply(interaction, `Invalid Url: ${arg_url}`);
    }
    
    if (await isUrl(attachement_url)) {
        if (check_if_image) {
            const res = await fetchUrl(attachement_url);
            if (isImageUrlType(res.type)) {
                urls.push(attachement_url);
            } else {
                await sendToChannel(channel, `Attachement ${attachement_url} does not look like an image`);
            }
        } else {
            urls.push(attachement_url);
        }
    }
    return urls;
}

/**
 * Get all images from a directory recursively
 * @param dir Directory to walk
 * @returns List of images in a directory
 */
export function walk(dir: string): string[] {
    let results: Array<string> = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file: string) {
        file = dir + "/" + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (isPngOrJpg(file.toLowerCase())) {
                results.push(file);
            }
        }
    });
    return results;
}

/**
 * Construct a simple embed
 * @param title Embed title
 * @param description Embed description
 * @param color Embed color
 * @returns Constructed embed
 */
export function getSimpleEmbed(title: string, description: string, color: ColorResolvable) {
    const embed = new EmbedBuilder();
    embed.setTitle(title);
    embed.setDescription(description || "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
    embed.setColor(color);
    return embed;
}

/**
 * @returns Current date and time
 */
export function getDateTime() {
    const now = new Date();
    const date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    const time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    return date + " " + time;
}

/**
 * Convert seconds to days, hours, minutes and seconds
 * @param seconds Time in seconds
 * @returns Time in days, hours, minutes and seconds
 */
export function secondsToDhms(seconds: number) {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);

    const dDisplay = d > 0 ? (d + "d") : "";
    const hDisplay = h > 0 ? (h + "h") : "";
    const mDisplay = m > 0 ? (m + "m") : "";
    const sDisplay = s > 0 ? (s + "s") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

/**
 * Clamp a value between to limits
 * @param num Number to clamp
 * @param min Lower limit
 * @param max Lower limit
 * @returns Clamped value
 */
export function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}

/**
 * Wait for some time
 * @param ms time in milliseconds
 */
export function sleep(ms: number): Promise<unknown> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Remove http/https scheme from a url
 * @param url a url
 * @returns url without http/https scheme
 */
export function stripUrlScheme(url: string) {
    return url.replace("https://", "").replace("http://", "");
}

/**
 * Fetch a url
 * @param url Url to fetch
 * @returns Fetch status
 */
export async function fetchUrl(url: string) {
    const res = await fetch(url);
    if (!res.ok) { return { ok: res.ok, type: "", status: res.status, statusText: res.statusText }; }
    const buff = await res.blob();
    return { ok: res.ok, type: buff.type, status: res.status, statusText: res.statusText };
}

/**
 * Determine whether a file ai png or jpg
 * @param name file name
 * @returns 
 */
export function isPngOrJpg(name: string | none) {
    return name ? (name.endsWith(".png") || name.endsWith(".jpeg") || name.endsWith(".jpg")) : false;
}

/**
 * Determine whether url type is image
 * @param type file name
 * @returns 
 */
export function isImageUrlType(type: string) {
    return type.startsWith("image/");
}

/**
 * Determine whether url type is png or jpg
 * @param type file name
 * @returns 
 */
export function isPngOrJpgUrlType(type: string) {
    return type == "image/apng" || type == "image/png" || type == "image/jpeg" || type == "image/jpg";
}

/**
 * Add a new element with a specified key and value to the Map, or overwrite if exists
 * @param map Target map
 * @param key Target key
 * @param value Value to put
 */
export function setOrAppendToMap<K, V>(map: Map<K, V[]>, key: K, value: V) {
    if (map.has(key)) {
        map.get(key)!.push(value);
    } else {
        map.set(key, [value]);
    }
}