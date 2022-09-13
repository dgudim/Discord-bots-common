"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPngOrJpgUrlType = exports.isImageUrlType = exports.isPngOrJpg = exports.fetchUrl = exports.stripUrlScheme = exports.normalizeTags = exports.sleep = exports.clamp = exports.getDateTime = exports.getSimpleEmbed = exports.walk = exports.combinedReply = exports.safeReply = exports.messageReply = exports.sendToChannel = exports.getChannelName = exports.perc2color = exports.hsvToRgb = exports.limitLength = exports.getValueIfExists = exports.getFileHash = exports.isUrl = exports.trimStringArray = exports.getBaseLog = exports.normalize = exports.getFileName = exports.isDirectory = exports.eight_mb = void 0;
const discord_js_1 = require("discord.js");
const fs = require("fs");
const hash_wasm_1 = require("hash-wasm");
const colors_1 = require("./colors");
const logger_1 = require("./logger");
exports.eight_mb = 1024 * 1024 * 8;
function isDirectory(path) {
    return fs.existsSync(path) && fs.statSync(path).isDirectory();
}
exports.isDirectory = isDirectory;
function getFileName(file) {
    return file.substring(file.lastIndexOf("/") + 1);
}
exports.getFileName = getFileName;
function normalize(str) {
    return str ? str.toLowerCase().trim() : "";
}
exports.normalize = normalize;
function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}
exports.getBaseLog = getBaseLog;
function trimStringArray(arr) {
    return arr.map(element => {
        return normalize(element);
    }).filter(element => {
        return element.length != 0;
    });
}
exports.trimStringArray = trimStringArray;
async function isUrl(url) {
    return (await fetch(url)).ok;
}
exports.isUrl = isUrl;
async function getFileHash(file) {
    return (0, hash_wasm_1.blake3)(fs.readFileSync(file));
}
exports.getFileHash = getFileHash;
async function getValueIfExists(db, search_path, get_path = search_path) {
    return await db.exists(search_path) ? db.getData(get_path) : "-";
}
exports.getValueIfExists = getValueIfExists;
function limitLength(str, max_length) {
    if (str.length > max_length) {
        str = str.slice(0, max_length - 3) + "...";
    }
    return str;
}
exports.limitLength = limitLength;
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
function hsvToRgb(h, s, v) {
    let r = 0, g = 0, b = 0;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }
    return [r * 255, g * 255, b * 255];
}
exports.hsvToRgb = hsvToRgb;
function perc2color(perc) {
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
    return ("#" + ("000000" + h.toString(16)).slice(-6));
}
exports.perc2color = perc2color;
function embedToString(embed) {
    let str = embed.data.title + "\n" + embed.data.description;
    for (const field of embed.data.fields || []) {
        str += `\n${field.name}: ${field.value}`;
    }
    return str;
}
function payloadToString(payload) {
    let str = payload.content || "";
    if (payload.files) {
        str += "\nfiles";
        for (const file of payload.files) {
            str += `\n${file}`;
        }
    }
    if (payload.embeds) {
        str += "\nfiles";
        for (const embed of payload.embeds) {
            str += `\n${embed}`;
        }
    }
    if (payload.attachments) {
        str += "\nattachments";
        for (const attachment of payload.attachments) {
            str += `\n${attachment.toJSON()}`;
        }
    }
    if (payload.components) {
        str += "\ncomponents";
        for (const component of payload.components) {
            str += `\n${component}`;
        }
    }
    return str;
}
function messageContentToString(content) {
    if (content instanceof discord_js_1.EmbedBuilder) {
        return embedToString(content);
    }
    else if (content instanceof discord_js_1.MessagePayload) {
        return payloadToString(content.options);
    }
    else if (typeof content === "string") {
        return content;
    }
    else {
        return payloadToString(content);
    }
}
function getChannelName(channel) {
    return channel.lastMessage?.guild?.channels.cache.get(channel.id)?.name || "private " + channel;
}
exports.getChannelName = getChannelName;
async function sendToChannel(channel, content, log_asError) {
    if (channel) {
        (0, logger_1.log)(`channel ${(0, colors_1.wrap)(getChannelName(channel), colors_1.colors.GREEN)}: ${messageContentToString(content)}`, log_asError ? logger_1.logLevel.ERROR : logger_1.logLevel.INFO);
        if (content instanceof discord_js_1.EmbedBuilder) {
            await channel.send({
                embeds: [content]
            });
        }
        else if (typeof content === "string") {
            const len = content.length;
            let pos = 0;
            while (pos < len) {
                const slice = content.slice(pos, pos + 1999);
                await channel.send(slice);
                pos += 1999;
            }
        }
        else if (content instanceof discord_js_1.MessagePayload) {
            await channel.send(content);
        }
        else {
            // MessageOptions, InteractionReplyOptions
            await channel.send({
                embeds: content.embeds,
                files: content.files,
                attachments: content.attachments,
                content: content.content,
                components: content.components,
                allowedMentions: content.allowedMentions
            });
        }
    }
}
exports.sendToChannel = sendToChannel;
async function messageReply(message, content) {
    (0, logger_1.info)(`channel ${(0, colors_1.wrap)(getChannelName(message.channel), colors_1.colors.PURPLE)}: (reply to ${message.content}) -> ${content}`);
    await message.reply(content);
}
exports.messageReply = messageReply;
async function safeReply(interaction, content, ephemeral = false) {
    if (interaction.replied) {
        await sendToChannel(interaction.channel, content);
    }
    else {
        const channel = interaction.channel;
        if (channel) {
            const deffered_str = interaction.deferred ? "edited reply" : "reply";
            (0, logger_1.info)(`channel ${(0, colors_1.wrap)(getChannelName(channel), colors_1.colors.LIGHTER_BLUE)}: (${deffered_str} to /${interaction.command?.name}) -> ${messageContentToString(content)}`);
            if (content instanceof discord_js_1.EmbedBuilder) {
                if (interaction.deferred) {
                    await interaction.editReply({
                        embeds: [content]
                    });
                }
                else {
                    await interaction.reply({
                        embeds: [content],
                        ephemeral: ephemeral
                    });
                }
            }
            else if (typeof content === 'string') {
                if (interaction.deferred) {
                    await interaction.editReply({
                        content: content
                    });
                }
                else {
                    await interaction.reply({
                        content: content,
                        ephemeral: ephemeral
                    });
                }
            }
            else if (content instanceof discord_js_1.MessagePayload) {
                if (interaction.deferred) {
                    await interaction.editReply(content);
                }
                else {
                    await interaction.reply(content);
                }
            }
            else {
                // InteractionReplyOptions and MessageOptions
                if (interaction.deferred) {
                    await interaction.editReply({
                        embeds: content.embeds,
                        files: content.files,
                        attachments: content.attachments,
                        content: content.content,
                        components: content.components,
                        allowedMentions: content.allowedMentions
                    });
                }
                else {
                    await interaction.reply({
                        embeds: content.embeds,
                        files: content.files,
                        attachments: content.attachments,
                        content: content.content,
                        components: content.components,
                        allowedMentions: content.allowedMentions,
                        ephemeral: true,
                    });
                }
            }
        }
    }
}
exports.safeReply = safeReply;
async function combinedReply(interaction, message, content, ephemeral = false) {
    if (interaction) {
        await safeReply(interaction, content, ephemeral);
    }
    else if (message) {
        await sendToChannel(message.channel, content);
    }
}
exports.combinedReply = combinedReply;
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + "/" + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        }
        else {
            if (isPngOrJpg(file.toLowerCase())) {
                results.push(file);
            }
        }
    });
    return results;
}
exports.walk = walk;
function getSimpleEmbed(title, description, color) {
    const embed = new discord_js_1.EmbedBuilder();
    embed.setTitle(title);
    embed.setDescription(description || "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
    embed.setColor(color);
    return embed;
}
exports.getSimpleEmbed = getSimpleEmbed;
function getDateTime() {
    const now = new Date();
    const date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    const time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    return date + " " + time;
}
exports.getDateTime = getDateTime;
function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
exports.clamp = clamp;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.sleep = sleep;
function normalizeTags(tags) {
    return tags.replaceAll(" ", ",").replaceAll("_", " ").replaceAll(":", "_").replaceAll("'", "");
}
exports.normalizeTags = normalizeTags;
function stripUrlScheme(url) {
    return url.replace("https://", "").replace("http://", "");
}
exports.stripUrlScheme = stripUrlScheme;
async function fetchUrl(url) {
    const res = await fetch(url);
    if (!res.ok) {
        return { ok: res.ok, type: "", status: res.status, statusText: res.statusText };
    }
    const buff = await res.blob();
    return { ok: res.ok, type: buff.type, status: res.status, statusText: res.statusText };
}
exports.fetchUrl = fetchUrl;
function isPngOrJpg(name) {
    return name ? (name.endsWith(".png") || name.endsWith(".jpeg") || name.endsWith(".jpg")) : false;
}
exports.isPngOrJpg = isPngOrJpg;
function isImageUrlType(type) {
    return type.startsWith("image/");
}
exports.isImageUrlType = isImageUrlType;
function isPngOrJpgUrlType(type) {
    return type == "image/apng" || type == "image/png" || type == "image/jpeg" || type == "image/jpg";
}
exports.isPngOrJpgUrlType = isPngOrJpgUrlType;
