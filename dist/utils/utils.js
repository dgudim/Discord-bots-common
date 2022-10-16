"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setOrAppendToMap = exports.isPngOrJpgUrlType = exports.isImageUrlType = exports.isPngOrJpg = exports.fetchUrl = exports.stripUrlScheme = exports.sleep = exports.clamp = exports.secondsToDhms = exports.getDateTime = exports.getSimpleEmbed = exports.walk = exports.getAllUrlFileAttachements = exports.safeReply = exports.messageReply = exports.sendToChannel = exports.userToString = exports.guildToString = exports.channelToString = exports.messageContentToString = exports.perc2color = exports.hsvToRgb = exports.limitLength = exports.getValueIfExists = exports.getStringHash = exports.getFileHash = exports.isUrl = exports.normalizeStringArray = exports.getBaseLog = exports.normalize = exports.getFileName = exports.isFile = exports.isDirectory = exports.eight_mb = void 0;
const discord_js_1 = require("discord.js");
const fs = require("fs");
const node_json_db_1 = require("node-json-db");
const hash_wasm_1 = require("hash-wasm");
const colors_1 = require("./colors");
const logger_1 = require("./logger");
const stream_1 = require("stream");
exports.eight_mb = 1024 * 1024 * 8;
/**
 * Check is path leads to a directory
 * @param path Directory/File path
 * @returns True if the path leads to a directory
 */
function isDirectory(path) {
    return path ? (fs.existsSync(path) && fs.statSync(path).isDirectory()) : false;
}
exports.isDirectory = isDirectory;
/**
 * Check is path leads to a file
 * @param path Directory/File path
 * @returns True if the path leads to a file
 */
function isFile(path) {
    return path ? (fs.existsSync(path) && fs.statSync(path).isFile()) : false;
}
exports.isFile = isFile;
/**
 * Get file name from path of url
 * @param file Path/Url
 * @returns The last part of the path or url
 */
function getFileName(file) {
    const parts = file.split("/");
    const lastPIndex = file.indexOf("?");
    return parts[parts.length - 1].substring(0, lastPIndex == -1 ? file.length : lastPIndex);
}
exports.getFileName = getFileName;
/**
 * Trim and lowercase a string
 * @param str String to normalize
 * @returns Lowercased and trimmed string
 */
function normalize(str) {
    return str ? str.toLowerCase().trim() : "";
}
exports.normalize = normalize;
/**
 * Get the log of a number with the base `base`
 * @param base Base of the logarithm
 * @param number Input number
 * @returns The log with the base
 */
function getBaseLog(base, number) {
    return Math.log(number) / Math.log(base);
}
exports.getBaseLog = getBaseLog;
/**
 * Normalizes every element of the string array
 * @param arr Array to normalize
 * @returns Array with every value normalized
 */
function normalizeStringArray(arr) {
    return arr.map(element => {
        return normalize(element);
    }).filter(element => {
        return element.length != 0;
    });
}
exports.normalizeStringArray = normalizeStringArray;
/**
 * Check whether a given string is url
 * @param url Input url/not url
 * @returns Whether the input string is url
 */
async function isUrl(url) {
    if (!url) {
        return false;
    }
    try {
        return (await fetch(url)).ok;
    }
    catch (e) {
        (0, logger_1.error)(e);
        return false;
    }
}
exports.isUrl = isUrl;
/**
 * Get file blake3 hash
 * @param file Input file
 * @returns Blake3 hash
 */
async function getFileHash(file) {
    return isFile(file) ? (0, hash_wasm_1.blake3)(fs.readFileSync(file)) : "";
}
exports.getFileHash = getFileHash;
/**
 * Get string blake3 hash
 * @param str Input String
 * @returns Blake3 hash
 */
async function getStringHash(str) {
    return (0, hash_wasm_1.blake3)(str);
}
exports.getStringHash = getStringHash;
/**
 * Get a value from a json database if it exists
 * @param db Json databse
 * @param path Key path
 * @returns The value if it exists
 */
async function getValueIfExists(db, path) {
    try {
        return await db.getData(path);
    }
    catch (e) {
        if (e instanceof node_json_db_1.DataError) {
            return "-";
        }
        throw e;
    }
}
exports.getValueIfExists = getValueIfExists;
/**
 * Limit the length of a string
 * @param str String to limit the length of
 * @param max_length Maximum length of the string
 * @returns Limited string, adding ... if it's too long
 */
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
 * @param   h       The hue
 * @param   s       The saturation
 * @param   v       The value
 * @returns The RGB representation
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
/**
 * Convert a percentage value to a gradient from red to green
 * @param perc Value in percent (0 - 100)
 * @returns Hex representation
 */
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
function payloadToString(payload) {
    let str = payload.content || "";
    if (payload.files?.length) {
        str += "\nfiles";
        for (const file of payload.files) {
            if (typeof file === "string") {
                str += `\n${file}`;
            }
            else if ("attachment" in file) {
                // Attachment, AttachmentPayload and AttachmentBuilder
                let attachment = "stream";
                if (file.attachment instanceof Buffer) {
                    attachment = `buffer(${file.attachment.byteLength}`;
                }
                else if (typeof file.attachment === "string") {
                    attachment = file.attachment;
                }
                str += `\n${file.name}: ${file.description}, data: ${attachment}`;
            }
            else if (file instanceof Buffer) {
                str += `\nbuffer (${file.byteLength})`;
            }
            else if (file instanceof stream_1.Stream) {
                str += `\nstream`;
            }
            else {
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
            }
            else {
                str += embedToString(embed.toJSON());
            }
        }
    }
    return str;
}
/**
 * Сonvert message content to it's string representation
 * @param content Almost any message content from DiscordJS (Embed, string, Payload, etc.)
 * @returns String representation
 */
function messageContentToString(content) {
    if (content instanceof discord_js_1.EmbedBuilder) {
        return embedToString(content.data);
    }
    else if (content instanceof discord_js_1.MessagePayload) {
        return payloadToString(content.options);
    }
    else if (typeof content === "string") {
        return content;
    }
    else {
        // message payload option
        return payloadToString(content);
    }
}
exports.messageContentToString = messageContentToString;
/**
 * Сonvert a text channel to it's string representation
 * @param channel Text channel from DiscordJS
 * @param parse_guild Whether to prepenf guild co channel
 * @returns String representation
 */
function channelToString(channel, parse_guild) {
    if ("guild" in channel) {
        const guild_str = parse_guild ? `${guildToString(channel.guild)} ` : "";
        return `${guild_str}Channel: ${(0, colors_1.wrap)(channel.name || "private " + channel, colors_1.colors.GREEN)} (${(0, colors_1.wrap)(channel.id, colors_1.colors.GRAY)})`;
    }
    else {
        return `📜 Channel: DM with ${(0, colors_1.wrap)(channel.recipient?.tag, colors_1.colors.LIGHT_PURPLE)} (${(0, colors_1.wrap)(channel.id, colors_1.colors.GRAY)})`;
    }
}
exports.channelToString = channelToString;
/**
 * Convert a guild to it's string representation
 * @param guild Guild from DiscordJS
 * @returns String representation
 */
function guildToString(guild) {
    if (!guild) {
        return `🛡️ Guild: ${(0, colors_1.wrap)("invalid", colors_1.colors.RED)}`;
    }
    if (guild instanceof discord_js_1.BaseGuild) {
        return `🛡️ Guild: ${(0, colors_1.wrap)(guild.name, colors_1.colors.PURPLE)} (${(0, colors_1.wrap)(guild.id, colors_1.colors.GRAY)})`;
    }
    return `🛡️ Guild: ${(0, colors_1.wrap)(guild[1], colors_1.colors.LIGHT_YELLOW)} (${(0, colors_1.wrap)(guild[0], colors_1.colors.GRAY)})`;
}
exports.guildToString = guildToString;
/**
 * Convert a user to it's string representation
 * @param user User from DiscordJS
 * @returns String representation
 */
function userToString(user) {
    return `👤 User: ${(0, colors_1.wrap)(user.tag, colors_1.colors.LIGHT_RED)} (${(0, colors_1.wrap)(user.id, colors_1.colors.GRAY)})`;
}
exports.userToString = userToString;
/**
 * Send a message to a text channel
 * @param channel Discord text channel
 * @param content Message contents
 * @param logAsError Whether to log to the console as error
 */
async function sendToChannel(channel, content, logAsError) {
    if (!content) {
        return (0, logger_1.warn)(`❌ Can't send null content`);
    }
    if (!channel) {
        return (0, logger_1.warn)(`❌ Can't send to null channel: ${messageContentToString(content)}`);
    }
    (0, logger_1.log)(`${channelToString(channel, true)}: ${messageContentToString(content)}`, logAsError ? logger_1.logLevel.ERROR : logger_1.logLevel.INFO);
    try {
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
    }
    catch (err) {
        (0, logger_1.error)(`❌ Error sending to ${channelToString(channel, true)}, missing permissions? | error: ${err}`);
    }
}
exports.sendToChannel = sendToChannel;
/**
 * Reply to a message
 * @param message Message to reply to
 * @param content Reply content
 */
async function messageReply(message, content) {
    (0, logger_1.info)(`${channelToString(message.channel, true)}: (reply to ${message.content}) -> ${content}`);
    await message.reply(content);
}
exports.messageReply = messageReply;
/**
 * Safely reply to an interaction (if already replied send to channel, if deferred replied edit reply)
 * @param interaction Interaction to reply to
 * @param content Reply content
 * @param ephemeral Whether the reply is only visible to sender
 */
async function safeReply(interaction, content, ephemeral = false) {
    if (!interaction) {
        return (0, logger_1.info)(`can't reply to null interraction with content: ${messageContentToString(content)}`);
    }
    if (interaction.replied) {
        await sendToChannel(interaction.channel, content);
    }
    else {
        const channel = interaction.channel;
        if (channel) {
            const deffered_str = interaction.deferred ? "edited reply" : "reply";
            (0, logger_1.info)(`${channelToString(channel, true)}: (${deffered_str} to /${interaction.command?.name}) -> ${messageContentToString(content)}`);
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
            else if (typeof content === "string") {
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
                }
                else {
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
exports.safeReply = safeReply;
/**
 * Gets url and attachement from an interaction
 * @param interaction Interaction to get attachement urls from
 * @param url_key Parameter key with url
 * @param attachement_key Parameter key with an attachement
 * @param check_if_image Whether to chek if urls point to an image
 */
async function getAllUrlFileAttachements(interaction, url_key, attachement_key, check_if_image) {
    if (!interaction) {
        (0, logger_1.info)(`can't get attachements from a null interraction with keys: ${url_key} ${attachement_key}`);
        return [];
    }
    const arg_url = interaction.options.getString(url_key);
    const attachement_url = interaction.options.getAttachment(attachement_key)?.url || "";
    const channel = interaction.channel;
    const urls = [];
    if (await isUrl(arg_url)) {
        urls.push(arg_url);
    }
    else if (arg_url) {
        await safeReply(interaction, `Invalid Url: ${arg_url}`);
    }
    if (await isUrl(attachement_url)) {
        if (check_if_image) {
            const res = await fetchUrl(attachement_url);
            if (isImageUrlType(res.type)) {
                urls.push(attachement_url);
            }
            else {
                await sendToChannel(channel, `Attachement ${attachement_url} does not look like an image`);
            }
        }
        else {
            urls.push(attachement_url);
        }
    }
    return urls;
}
exports.getAllUrlFileAttachements = getAllUrlFileAttachements;
/**
 * Get all images from a directory recursively
 * @param dir Directory to walk
 * @returns List of images in a directory
 */
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
/**
 * Construct a simple embed
 * @param title Embed title
 * @param description Embed description
 * @param color Embed color
 * @returns Constructed embed
 */
function getSimpleEmbed(title, description, color) {
    const embed = new discord_js_1.EmbedBuilder();
    embed.setTitle(title);
    embed.setDescription(description || "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
    embed.setColor(color);
    return embed;
}
exports.getSimpleEmbed = getSimpleEmbed;
/**
 * @returns Current date and time
 */
function getDateTime() {
    const now = new Date();
    const date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    const time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    return date + " " + time;
}
exports.getDateTime = getDateTime;
/**
 * Convert seconds to days, hours, minutes and seconds
 * @param seconds Time in seconds
 * @returns Time in days, hours, minutes and seconds
 */
function secondsToDhms(seconds) {
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
exports.secondsToDhms = secondsToDhms;
/**
 * Clamp a value between to limits
 * @param num Number to clamp
 * @param min Lower limit
 * @param max Lower limit
 * @returns Clamped value
 */
function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
exports.clamp = clamp;
/**
 * Wait for some time
 * @param ms time in milliseconds
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.sleep = sleep;
/**
 * Remove http/https scheme from a url
 * @param url a url
 * @returns url without http/https scheme
 */
function stripUrlScheme(url) {
    return url.replace("https://", "").replace("http://", "");
}
exports.stripUrlScheme = stripUrlScheme;
/**
 * Fetch a url
 * @param url Url to fetch
 * @returns Fetch status
 */
async function fetchUrl(url) {
    const res = await fetch(url);
    if (!res.ok) {
        return { ok: res.ok, type: "", status: res.status, statusText: res.statusText };
    }
    const buff = await res.blob();
    return { ok: res.ok, type: buff.type, status: res.status, statusText: res.statusText };
}
exports.fetchUrl = fetchUrl;
/**
 * Determine whether a file ends with png or jpg
 * @param name file name
 * @returns Whether a file ends with png or jpg
 */
function isPngOrJpg(name) {
    return name ? (name.endsWith(".png") || name.endsWith(".jpeg") || name.endsWith(".jpg")) : false;
}
exports.isPngOrJpg = isPngOrJpg;
/**
 * Determine whether url type is image
 * @param type file name
 * @returns Whether a url type is any image
 */
function isImageUrlType(type) {
    return type.startsWith("image/");
}
exports.isImageUrlType = isImageUrlType;
/**
 * Determine whether url type is png or jpg
 * @param type file name
 * @returns Whether a url type is png or jpg
 */
function isPngOrJpgUrlType(type) {
    return type == "image/apng" || type == "image/png" || type == "image/jpeg" || type == "image/jpg";
}
exports.isPngOrJpgUrlType = isPngOrJpgUrlType;
/**
 * Add a new element with a specified key and value to the Map, or overwrite if exists
 * @param map Target map
 * @param key Target key
 * @param value Value to put
 * @returns True if the key was created
 */
function setOrAppendToMap(map, key, value) {
    if (map.has(key)) {
        map.get(key).push(value);
        return false;
    }
    else {
        map.set(key, [value]);
        return true;
    }
}
exports.setOrAppendToMap = setOrAppendToMap;
