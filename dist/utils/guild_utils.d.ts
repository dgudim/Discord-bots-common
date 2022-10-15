import { Guild, GuildMember, Client, ColorResolvable, GuildChannelCreateOptions, Snowflake, Role } from "discord.js";
import { none } from "./utils";
/**
 * Get all members from a guild
 * @param guild Guild to get members from
 * @returns All members
 */
export declare function getAllMembers(guild: Guild): Promise<GuildMember[]>;
/**
 * Get all guilds the bot is currently in
 * @param client Bot client instance
 * @returns All guild
 */
export declare function getAllGuilds(client: Client): Promise<Guild[]>;
/**
 * Create a role in a guild if it doesn't exist
 * @param guild Target guild
 * @param name Role name
 * @param color Role color
 * @returns Created or retrieved role
 */
export declare function createRoleIfNotExists(guild: Guild, name: string, color: ColorResolvable): Promise<Role | undefined>;
/**
 * Delete a role in a guild if it exists
 * @param guild Target guild
 * @param name Role name
 */
export declare function deleteRoleIfExists(guild: Guild, name: string): Promise<void>;
/**
 * Create channel or a channel category in a guild if it doesn't exist
 * @param guild Target guild
 * @param options Channel options
 * @param is_category Whether to create a category channel
 * @returns Created or retrieved channel
 */
export declare function createChannelIfNotExists(guild: Guild, options: GuildChannelCreateOptions, is_category?: boolean): Promise<import("discord.js").GuildBasedChannel | undefined>;
/**
 * Delete channel or a channel category in a guild if it exists
 * @param guild Target guild
 * @param name Channel name
 */
export declare function deleteChannelIfExists(guild: Guild, name: string): Promise<void>;
/**
 * Try to get a member from a guild by id, return undefined if it doesn't exist
 * @param guild Target guild
 * @param memberId Member id
 * @returns Guild member if found
 */
export declare function tryToGetMember(guild: Guild, memberId: Snowflake): Promise<GuildMember | undefined>;
/**
 * Update user's roles, e.g. rank roles or clan roles
 * @param prev_role_name Previous role name (starts with)
 * @param member Target member
 * @param new_roles New role
 */
export declare function swapRoles(prev_role_name: string, member: GuildMember, new_roles: Role | Role[] | none): Promise<void>;
