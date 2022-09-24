"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPngOrJpgUrlType = exports.isImageUrlType = exports.isPngOrJpg = exports.fetchUrl = exports.stripUrlScheme = exports.normalizeTags = exports.sleep = exports.clamp = exports.getDateTime = exports.getSimpleEmbed = exports.walk = exports.getAllUrlFileAttachements = exports.safeReply = exports.messageReply = exports.sendToChannel = exports.userToString = exports.guildToString = exports.channelToString = exports.perc2color = exports.hsvToRgb = exports.limitLength = exports.getValueIfExists = exports.getFileHash = exports.isUrl = exports.trimStringArray = exports.getBaseLog = exports.normalize = exports.getFileName = exports.isDirectory = exports.eight_mb = void 0;
const discord_js_1 = require("discord.js");
const fs = require("fs");
const node_json_db_1 = require("node-json-db");
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
    if (!url) {
        return false;
    }
    return (await fetch(url)).ok;
}
exports.isUrl = isUrl;
async function getFileHash(file) {
    return (0, hash_wasm_1.blake3)(fs.readFileSync(file));
}
exports.getFileHash = getFileHash;
async function getValueIfExists(db, path) {
    try {
        return await db.getData(path);
    }
    catch (e) {
        if (e instanceof node_json_db_1.DataError) {
            return '-';
        }
        throw e;
    }
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
    let str = "\n----------------------------------------------------------\n";
    if ('author' in embed || 'title' in embed || 'description' in embed) {
        str += `author: ${embed.author} | title: ${embed.title} | description: ${embed.description}`;
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
    if (payload.files) {
        str += "\nfiles";
        for (const file of payload.files) {
            if (typeof file === "string") {
                str += `\n${file}`;
            }
            else if ('attachment' in file) {
                // AttachmentBuilder, AttachmentPayload and AttachmentBuilder
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
                str += `\nbuffer(${file.byteLength})`;
            }
            else if (file instanceof discord_js_1.Attachment) {
                str += `\n ${file.name}: ${file.description}, (url: ${file.url}) (size ${file.size})`;
            }
            else if ('toJSON' in file) {
                str += `\n${file.toJSON()}`;
            }
        }
    }
    if (payload.embeds) {
        str += "\nembeds:";
        for (const embed of payload.embeds) {
            if (!('toJSON' in embed)) {
                str += embedToString(embed);
            }
            else {
                str += `\n json encodable embed: ${embed.toJSON()}`;
            }
        }
    }
    return str;
}
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
function channelToString(channel, parse_guild) {
    if ('guild' in channel) {
        const guild_str = parse_guild ? `${guildToString(channel.guild)} ` : "";
        return `${guild_str}Channel: ${(0, colors_1.wrap)(channel.name || "private " + channel, colors_1.colors.GREEN)} (${(0, colors_1.wrap)(channel.id, colors_1.colors.GRAY)})`;
    }
    else {
        return `📜 Channel: DM with ${(0, colors_1.wrap)(channel.recipient?.tag, colors_1.colors.LIGHT_PURPLE)} (${(0, colors_1.wrap)(channel.id, colors_1.colors.GRAY)})`;
    }
}
exports.channelToString = channelToString;
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
function userToString(user) {
    return `👤 User: ${(0, colors_1.wrap)(user.tag, colors_1.colors.LIGHT_RED)} (${(0, colors_1.wrap)(user.id, colors_1.colors.GRAY)})`;
}
exports.userToString = userToString;
async function sendToChannel(channel, content, log_asError) {
    if (channel) {
        (0, logger_1.log)(`${channelToString(channel, true)}: ${messageContentToString(content)}`, log_asError ? logger_1.logLevel.ERROR : logger_1.logLevel.INFO);
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
}
exports.sendToChannel = sendToChannel;
async function messageReply(message, content) {
    (0, logger_1.info)(`${channelToString(message.channel, true)}: (reply to ${message.content}) -> ${content}`);
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
async function getAllUrlFileAttachements(interaction, url_key, attachement_key, check_if_image) {
    let arg_url = interaction.options.getString(url_key);
    let attachement_url = interaction.options.getAttachment(attachement_key)?.url || "";
    let channel = interaction.channel;
    let urls = [];
    if (await isUrl(arg_url)) {
        urls.push(arg_url);
    }
    else if (arg_url) {
        await safeReply(interaction, "Invalid Url");
    }
    if (await isUrl(attachement_url)) {
        if (check_if_image) {
            let res = await fetchUrl(attachement_url);
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
