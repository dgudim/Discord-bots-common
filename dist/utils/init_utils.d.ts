import { BitFieldResolvable, Client, GatewayIntentsString } from "discord.js";
import { DKRCommands } from "dkrcommands";
export declare function testEnvironmentVar(var_name: string, exit: boolean, is_file?: boolean): void;
export declare function getEnvironmentVar(var_name: string, default_value?: string): string;
export declare function dkrInit(client: Client, project_root_dir: string): DKRCommands;
/**
 *
 * @param intents Bot intents
 * @returns A discord bot client instance with specified intents or default ones if none were provided
 */
export declare function getClient(intents?: BitFieldResolvable<GatewayIntentsString, number>): Client<boolean>;
