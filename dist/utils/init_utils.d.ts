import { BitFieldResolvable, Client, GatewayIntentsString } from "discord.js";
import { DKRCommands } from "dkrcommands";
/**
 * Test if an environment variable is set
 * @param var_name Environment variable name
 * @param exit Whether to exit if the variable is not set
 * @param is_file Whether the variable should point to a file
 */
export declare function testEnvironmentVar(var_name: string, exit: boolean, is_file?: boolean): void;
/**
 * Get an environment variable
 * @param var_name Environment variable name
 * @param default_value Fallback value
 * @returns Variable contents of fallback value
 */
export declare function getEnvironmentVar(var_name: string, default_value?: string): string;
/**
 * Get DKRCommands commands handler instance
 * @param client A discord bot client instance
 * @param project_root_dir Project root directory (__dirname)
 * @returns DKRCommands commands handler instance
 */
export declare function dkrInit(client: Client, project_root_dir: string): DKRCommands;
/**
 * Get a discord bot client instance
 * @param intents Bot intents
 * @returns A discord bot client instance with specified intents or default ones if none were provided
 */
export declare function getClient(intents?: BitFieldResolvable<GatewayIntentsString, number>): Client<boolean>;
