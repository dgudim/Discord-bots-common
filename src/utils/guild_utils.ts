import { Guild, GuildMember, Client, ColorResolvable, GuildChannelCreateOptions, ChannelType, Snowflake, Role } from "discord.js";
import { wrap, colors } from "./colors";
import { error, info } from "./logger";
import { guildToString, none, userToString } from "./utils";

/**
 * Get all members from a guild
 * @param guild Guild to get members from
 * @returns All members
 */
export async function getAllMembers(guild: Guild) {
    const members: GuildMember[] = [];
    const members_async = await guild.members.fetch();

    for (const member of members_async) {
        members.push(await member[1].fetch());
    }

    return members;
}

/**
 * Get all guilds the bot is currently in
 * @param client Bot client instance
 * @returns All guild
 */
export async function getAllGuilds(client: Client) {
    const guilds: Guild[] = [];
    const guilds_async = await client.guilds.fetch();

    for (const guild of guilds_async) {
        guilds.push(await guild[1].fetch());
    }

    return guilds;
}

/**
 * Create a role in a guild if it doesn't exist
 * @param guild Target guild
 * @param name Role name
 * @param color Role color
 * @returns Created or retrieved role
 */
export async function createRoleIfNotExists(guild: Guild, name: string, color: ColorResolvable) {
    let role = guild.roles.cache.find(role => role.name === name);
    if (!role) {
        const role_message = `role: ${wrap(name, colors.LIGHTER_BLUE)} in ${guildToString(guild)}`;
        try {
            role = await guild.roles.create({
                name: name,
                color: color
            });
            info(`🔨 Created ${role_message}`);
        } catch (err) {
            error(`❌ Error creating ${role_message}, missing permissions? | error: ${err}`);
        }
    }
    return role;
}

/**
 * Delete a role in a guild if it exists
 * @param guild Target guild
 * @param name Role name
 */
export async function deleteRoleIfExists(guild: Guild, name: string) {
    const role = guild.roles.cache.find(role => role.name === name);
    if (role) {
        const role_message = `role: ${wrap(name, colors.LIGHTER_BLUE)} in ${guildToString(guild)}`;
        try {
            await guild.roles.delete(role);
            info(`🗑️ Deleted ${role_message}`);
        } catch (err) {
            error(`❌ Error deleting ${role_message}, missing permissions? | error: ${err}`);
        }
    }
}

/**
 * Create channel or a channel category in a guild if it doesn't exist
 * @param guild Target guild
 * @param options Channel options
 * @param is_category Whether to create a category channel
 * @returns Created or retrieved channel
 */
export async function createChannelIfNotExists(guild: Guild, options: GuildChannelCreateOptions, is_category?: boolean) {
    let channel = guild.channels.cache.find(channel => channel.name === options.name
        && (channel.type == ChannelType.GuildCategory || !is_category));
    if (!channel) {
        const channnel_message = `${is_category ? "category" : "text"} channel: ${wrap(options.name, colors.LIGHTER_BLUE)} in ${guildToString(guild)}`;
        try {
            channel = await guild.channels.create(options);
            info(`🔨 Created ${channnel_message}`);
        } catch (err) {
            error(`❌ Error creating ${channnel_message}, missing permissions? | error: ${err}`);
        }
    }
    return channel;
}

/**
 * Delete channel or a channel category in a guild if it exists
 * @param guild Target guild
 * @param name Channel name
 */
export async function deleteChannelIfExists(guild: Guild, name: string) {
    const channel = guild.channels.cache.find(channel => channel.name === name);
    if (channel) {
        const channel_message = `channel: ${wrap(name, colors.LIGHTER_BLUE)} in ${guildToString(guild)}`;
        try {
            await guild.channels.delete(channel);
            info(`🗑️ Deleted ${channel_message}`);
        } catch (err) {
            error(`❌ Error deleting ${channel_message}, missing permissions? | error: ${err}`);
        }
    }
}

// 
/**
 * Try to get a member from a guild by id, return undefined if it doesn't exist
 * @param guild Target guild
 * @param memberId Member id
 * @returns Guild member if found
 */
export async function tryToGetMember(guild: Guild, memberId: Snowflake) {
    try {
        return await guild.members.fetch(memberId);
    } catch (err) {
        info(`🚫 User ${wrap(memberId, colors.LIGHT_GREEN)} ${wrap("not present", colors.LIGHT_RED)} in ${guildToString(guild)}`);
        return undefined;
    }
}

/**
 * Update user's roles, e.g. rank roles or clan roles
 * @param prev_role_name Previous role name (starts with)
 * @param member Target member
 * @param new_roles New role
 */
export async function swapRoles(prev_role_name: string, member: GuildMember, new_roles: Role | Role[] | none) {

    if (!new_roles) {
        return error(`❌ Can't swap undefined roles`);
    }

    new_roles = ([] as Role[]).concat(new_roles);

    try {
        // find all roles that start with prev_role_name (filter not matched(undefined) values)
        const previous_roles = member.roles.cache.map(element => element.name.startsWith(prev_role_name) ? element : undefined).filter(element => element);
        for (const previous_role of previous_roles) {
            //remove previous role if not present in new_roles
            if (previous_role && !new_roles.includes(previous_role)) {
                member.roles.remove(previous_role);
                info(`${wrap("📤 Removed", colors.LIGHT_RED)} role ${previous_role.name} from user ${wrap(member.user.tag, colors.LIGHT_RED)}`);
            }
        }
        for (const new_role of new_roles) {
            // add the new role if not present in old_roles
            if (!previous_roles.includes(new_role)) {
                info(`${wrap("📥 Added", colors.LIGHT_GREEN)} role ${wrap(new_role.name, colors.GREEN)} to user ${wrap(member.user.tag, colors.BLUE)}`);
                member.roles.add(new_role);
            }
        }
    } catch (err) {
        error(`❌ Error swapping roles of ${userToString(member.user)} in ${guildToString(member.guild)}, missing permissions? | error: ${err}`);
    }
}