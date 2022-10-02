"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swapRoles = exports.tryToGetMember = exports.deleteChannelIfExists = exports.createChannelIfNotExists = exports.deleteRoleIfNotExists = exports.createRoleIfNotExists = exports.getAllGuilds = exports.getAllMembers = void 0;
const discord_js_1 = require("discord.js");
const colors_1 = require("./colors");
const logger_1 = require("./logger");
const utils_1 = require("./utils");
// get all members from a guild
async function getAllMembers(guild) {
    const members = [];
    const members_async = await guild.members.fetch();
    for (const member of members_async) {
        members.push(await member[1].fetch());
    }
    return members;
}
exports.getAllMembers = getAllMembers;
// get all guild the bot is currently in
async function getAllGuilds(client) {
    const guilds = [];
    const guilds_async = await client.guilds.fetch();
    for (const guild of guilds_async) {
        guilds.push(await guild[1].fetch());
    }
    return guilds;
}
exports.getAllGuilds = getAllGuilds;
// create a role in a guild if it doesn't exist
async function createRoleIfNotExists(guild, name, color) {
    let role = guild.roles.cache.find(role => role.name === name);
    if (!role) {
        const role_message = `role: ${(0, colors_1.wrap)(name, colors_1.colors.LIGHTER_BLUE)} in ${(0, utils_1.guildToString)(guild)}`;
        try {
            role = await guild.roles.create({
                name: name,
                color: color
            });
            (0, logger_1.info)(`🔨 Created ${role_message}`);
        }
        catch (err) {
            (0, logger_1.error)(`❌ Error creating ${role_message}, missing permissions? | error: ${err}`);
        }
    }
    return role;
}
exports.createRoleIfNotExists = createRoleIfNotExists;
// delete a role in a guild if it exists
async function deleteRoleIfNotExists(guild, name) {
    const role = guild.roles.cache.find(role => role.name === name);
    if (role) {
        const role_message = `role: ${(0, colors_1.wrap)(name, colors_1.colors.LIGHTER_BLUE)} in ${(0, utils_1.guildToString)(guild)}`;
        try {
            await guild.roles.delete(role);
            (0, logger_1.info)(`🗑️ Deleted ${role_message}`);
        }
        catch (err) {
            (0, logger_1.error)(`❌ Error deleting ${role_message}, missing permissions? | error: ${err}`);
        }
    }
}
exports.deleteRoleIfNotExists = deleteRoleIfNotExists;
// create channel or a channel category in a guild if it doesn't exist
async function createChannelIfNotExists(guild, options, is_category) {
    let channel = guild.channels.cache.find(channel => channel.name === options.name
        && (channel.type == discord_js_1.ChannelType.GuildCategory || !is_category));
    if (!channel) {
        const channnel_message = `${is_category ? "category" : "text"} channel: ${(0, colors_1.wrap)(options.name, colors_1.colors.LIGHTER_BLUE)} in ${(0, utils_1.guildToString)(guild)}`;
        try {
            channel = await guild.channels.create(options);
            (0, logger_1.info)(`🔨 Created ${channnel_message}`);
        }
        catch (err) {
            (0, logger_1.error)(`❌ Error creating ${channnel_message}, missing permissions? | error: ${err}`);
        }
    }
    return channel;
}
exports.createChannelIfNotExists = createChannelIfNotExists;
// delete channel or a channel category in a guild if it exists
async function deleteChannelIfExists(guild, name) {
    const channel = guild.channels.cache.find(channel => channel.name === name);
    if (channel) {
        const channel_message = `channel: ${(0, colors_1.wrap)(name, colors_1.colors.LIGHTER_BLUE)} in ${(0, utils_1.guildToString)(guild)}`;
        try {
            await guild.channels.delete(channel);
            (0, logger_1.info)(`🗑️ Deleted ${channel_message}`);
        }
        catch (err) {
            (0, logger_1.error)(`❌ Error deleting ${channel_message}, missing permissions? | error: ${err}`);
        }
    }
}
exports.deleteChannelIfExists = deleteChannelIfExists;
// try tu get a member from a guild by id, return undefined if it doesn't exist
async function tryToGetMember(guild, memberId) {
    try {
        return await guild.members.fetch(memberId);
    }
    catch (err) {
        (0, logger_1.info)(`🚫 User ${(0, colors_1.wrap)(memberId, colors_1.colors.LIGHT_GREEN)} ${(0, colors_1.wrap)("not present", colors_1.colors.LIGHT_RED)} in ${(0, utils_1.guildToString)(guild)}`);
        return undefined;
    }
}
exports.tryToGetMember = tryToGetMember;
// utility function to update user's roles, e.g. rank roles or clan roles
async function swapRoles(prev_role_name, member, new_roles) {
    if (!new_roles) {
        return (0, logger_1.error)(`❌ Can't swap undefined roles`);
    }
    new_roles = [].concat(new_roles);
    try {
        // find all roles that start with prev_role_name (filter not matched(undefined) values)
        const previous_roles = member.roles.cache.map(element => element.name.startsWith(prev_role_name) ? element : undefined).filter(element => element);
        for (const previous_role of previous_roles) {
            //remove previous role if not present in new_roles
            if (previous_role && !new_roles.includes(previous_role)) {
                member.roles.remove(previous_role);
                (0, logger_1.info)(`${(0, colors_1.wrap)("📤 Removed", colors_1.colors.LIGHT_RED)} role ${previous_role.name} from user ${(0, colors_1.wrap)(member.user.tag, colors_1.colors.LIGHT_RED)}`);
            }
        }
        for (const new_role of new_roles) {
            // add the new role if not present in old_roles
            if (!previous_roles.includes(new_role)) {
                (0, logger_1.info)(`${(0, colors_1.wrap)("📥 Added", colors_1.colors.LIGHT_GREEN)} role ${(0, colors_1.wrap)(new_role.name, colors_1.colors.GREEN)} to user ${(0, colors_1.wrap)(member.user.tag, colors_1.colors.BLUE)}`);
                member.roles.add(new_role);
            }
        }
    }
    catch (err) {
        (0, logger_1.error)(`❌ Error swapping roles of ${(0, utils_1.userToString)(member.user)} in ${(0, utils_1.guildToString)(member.guild)}, missing permissions? | error: ${err}`);
    }
}
exports.swapRoles = swapRoles;
