import { Guild, GuildMember, Client, ColorResolvable, GuildChannelCreateOptions, Snowflake, Role } from "discord.js";
export declare function getAllMembers(guild: Guild): Promise<GuildMember[]>;
export declare function getAllGuilds(client: Client): Promise<Guild[]>;
export declare function createRoleIfNotExists(guild: Guild, name: string, color: ColorResolvable): Promise<Role | undefined>;
export declare function deleteRoleIfNotExists(guild: Guild, name: string): Promise<void>;
export declare function createChannelIfNotExists(guild: Guild, options: GuildChannelCreateOptions, is_category?: boolean): Promise<import("discord.js").GuildBasedChannel | undefined>;
export declare function deleteChannelIfExists(guild: Guild, name: string): Promise<void>;
export declare function tryToGetMember(guild: Guild, memberId: Snowflake): Promise<GuildMember | undefined>;
export declare function swapRoles(prev_role_name: string, member: GuildMember, new_roles: Role | Role[]): Promise<void>;
