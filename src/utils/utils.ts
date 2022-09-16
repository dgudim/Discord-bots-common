import { ColorResolvable, CommandInteraction, Message, MessageOptions, MessagePayload, EmbedBuilder, TextBasedChannel, ChatInputCommandInteraction } from "discord.js";
import * as fs from "fs";

import { JsonDB } from "node-json-db";

import { blake3 } from "hash-wasm";

import { colors, wrap } from "./colors";
import { info, log, logLevel } from "./logger";

export const eight_mb = 1024 * 1024 * 8;

export function isDirectory(path: string): boolean {
    return fs.existsSync(path) && fs.statSync(path).isDirectory();
}

export function getFileName(file: string): string {
    return file.substring(file.lastIndexOf("/") + 1);
}

export function normalize(str: string | undefined | null): string {
    return str ? str.toLowerCase().trim() : "";
}

export function getBaseLog(x: number, y: number): number {
    return Math.log(y) / Math.log(x);
}

export function trimStringArray(arr: string[]): string[] {
    return arr.map(element => {
        return normalize(element);
    }).filter(element => {
        return element.length != 0;
    });
}

export async function isUrl(url: string): Promise<boolean> {
    return (await fetch(url)).ok;
}

export async function getFileHash(file: string): Promise<string> {
    return blake3(fs.readFileSync(file));
}

export async function getValueIfExists(db: JsonDB, search_path: string, get_path: string = search_path) {
    return await db.exists(search_path) ? db.getData(get_path) : "-";
}

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
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
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

function embedToString(embed: EmbedBuilder) {
    let str = embed.data.title + "\n" + embed.data.description;
    for (const field of embed.data.fields || []) {
        str += `\n${field.name}: ${field.value}`;
    }
    return str;
}

function payloadToString(payload: MessagePayload) {
    let str: string = payload.options.content || "";
    if (payload.options.files) {
        str += "\nfiles:\n";
        for (const file of payload.options.files) {
            str += `\n${file}`;
        }
    }
    return str;
}

export function getChannelName(channel: TextBasedChannel) {
    return channel.lastMessage?.guild?.channels.cache.get(channel.id)?.name || "private " + channel;
}

export async function sendToChannel(channel: TextBasedChannel | null, content: string | EmbedBuilder | MessagePayload | MessageOptions, log_asError?: boolean): Promise<void> {
    if (channel) {
        if (content instanceof EmbedBuilder) {
            info(`channel ${wrap(getChannelName(channel), colors.GREEN)}: ${embedToString(content)}`);
            await channel.send({
                embeds: [content]
            });
        } else if (content instanceof MessagePayload) {
            info(`channel ${wrap(getChannelName(channel), colors.LIGHT_BLUE)}: ${payloadToString(content)}`);
            await channel.send(content);
        } else if (typeof content === "string") {
            const len = content.length;
            let pos = 0;
            while (pos < len) {
                const slice = content.slice(pos, pos + 1999);
                log(`channel ${wrap(channel, colors.CYAN)}: ${content}`, log_asError ? logLevel.ERROR : logLevel.INFO);
                await channel.send(slice);
                pos += 1999;
            }
        } else {
            info(`channel ${wrap(getChannelName(channel), colors.LIGHTER_BLUE)}: ${content}`);
            await channel.send(content);
        }
    }
}

export async function messageReply(message: Message, content: string): Promise<void> {
    info(`channel ${wrap(getChannelName(message.channel), colors.PURPLE)}: (reply to ${message.content}) -> ${content}`);
    await message.reply(content);
}

export async function safeReply(interaction: CommandInteraction, content: string | EmbedBuilder | MessagePayload, ephemeral = false): Promise<void> {
    if (interaction.replied) {
        await sendToChannel(interaction.channel, content);
    } else {
        const channel = interaction.channel;
        if (channel) {
            const deffered_str = interaction.deferred ? "edited reply" : "reply";
            if (content instanceof EmbedBuilder) {
                info(`channel ${wrap(getChannelName(channel), colors.GREEN)}: (${deffered_str} to /${interaction.command?.name}) -> ${embedToString(content)}`);
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
            } else if (content instanceof MessagePayload) {
                info(`channel ${wrap(getChannelName(channel), colors.LIGHT_BLUE)}: (${deffered_str} to /${interaction.command?.name}) -> ${payloadToString(content)}`);
                const replyFunc = interaction.deferred ? interaction.editReply : interaction.reply;
                await replyFunc(content);
            } else {
                info(`channel ${wrap(getChannelName(channel), colors.LIGHTER_BLUE)}: (${deffered_str} to /${interaction.command?.name}) -> ${content}`);

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
            }
        }
    }
}

export async function combinedReply(interaction: CommandInteraction | undefined, message: Message | undefined, content: string | EmbedBuilder | MessagePayload, ephemeral = false): Promise<void> {
    if (interaction) {
        await safeReply(interaction, content, ephemeral);
    } else if (message) {
        await sendToChannel(message.channel, content);
    }
}

export async function getAllImageAttachements(interaction: ChatInputCommandInteraction | undefined, message: Message | undefined, msg_url?: string)
    : Promise<string[]> {

    let url = interaction ? interaction.options.getString('url') : msg_url;
    let channel = interaction ? interaction.channel : message!.channel;

    let urls: string[] = [];
    if (url) {
        if (await isUrl(url)) {
            urls.push(url);
        } else {
            await combinedReply(interaction, message, "Invalid Url");
        }
    }

    if (message?.attachments.size) {
        for (let attachement of message.attachments) {
            let res = await fetchUrl(attachement[1].url);
            if (isImageUrlType(res.type)) {
                urls.push(attachement[1].url);
            } else {
                await sendToChannel(channel, `attachement ${attachement[1].name} does not look like an image`);
            }
        }
    }

    return urls;
}

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

export function getSimpleEmbed(title: string, description: string, color: ColorResolvable) {
    const embed = new EmbedBuilder();
    embed.setTitle(title);
    embed.setDescription(description || "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
    embed.setColor(color);
    return embed;
}

export function getDateTime() {
    const now = new Date();
    const date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    const time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    return date + " " + time;
}

export function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}

export function sleep(ms: number): Promise<unknown> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function normalizeTags(tags: string): string {
    return tags.replaceAll(" ", ",").replaceAll("_", " ").replaceAll(":", "_").replaceAll("'", "");
}

export function stripUrlScheme(url: string) {
    return url.replace("https://", "").replace("http://", "");
}

export async function fetchUrl(url: string) {
    const res = await fetch(url);
    if (!res.ok) { return { ok: res.ok, type: "", status: res.status, statusText: res.statusText }; }
    const buff = await res.blob();
    return { ok: res.ok, type: buff.type, status: res.status, statusText: res.statusText };
}

export function isPngOrJpg(name: string | null | undefined) {
    return name ? (name.endsWith(".png") || name.endsWith(".jpeg") || name.endsWith(".jpg")) : false;
}

export function isImageUrlType(type: string) {
    return type.startsWith("image/");
}

export function isPngOrJpgUrlType(type: string) {
    return type == "image/apng" || type == "image/png" || type == "image/jpeg" || type == "image/jpg";
}