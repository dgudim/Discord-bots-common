import { BitFieldResolvable, Client, GatewayIntentBits, GatewayIntentsString } from "discord.js";
import { DKRCommands } from "dkrcommands";
import path = require("path");
import { colors, wrap } from "./colors";
import { error, info, warn } from "./logger";
import { isFile } from "./utils";

/**
 * Test if an environment variable is set
 * @param var_name Environment variable name
 * @param exit Whether to exit if the variable is not set
 * @param is_file Whether the variable should point to a file
 */
export function testEnvironmentVar(var_name: string, exit: boolean, is_file?: boolean) {
    if (!process.env[var_name]) {
        if (exit) {
            error(`${wrap(var_name, colors.LIGHTER_BLUE)} environment variable is not set, can't proceed`);
            process.exit(1);
        } else {
            warn(`consider setting ${wrap(var_name, colors.BLUE)} environment variable`);
        }
    } else if (is_file && !isFile(process.env[var_name])) {
        if (exit) {
            error(`${wrap(var_name, colors.LIGHTER_BLUE)} does not point to a file, can't proceed`);
            process.exit(1);
        } else {
            warn(`consider pointing ${wrap(var_name, colors.BLUE)} to file`);
        }
    }
}

/**
 * Get an environment variable
 * @param var_name Environment variable name
 * @param default_value Fallback value
 * @returns Variable contents of fallback value
 */
export function getEnvironmentVar(var_name: string, default_value = "") {
    return process.env[var_name] || default_value;
}

/**
 * Get DKRCommands commands handler instance
 * @param client A discord bot client instance
 * @param project_root_dir Project root directory (__dirname)
 * @returns DKRCommands commands handler instance
 */
export function dkrInit(client: Client, project_root_dir: string) {
    const handler = new DKRCommands(client, {
        commandsDir: path.join(project_root_dir, "commands"),
        typeScript: true,
        botOwners: process.env.OWNERS?.split(","),
        testServers: process.env.TEST_SERVERS?.split(",")
    });

    info(`${wrap("💁 Client ready", colors.LIGHT_YELLOW)}`);
    return handler;
}

/**
 * Get a discord bot client instance
 * @param intents Bot intents
 * @returns A discord bot client instance with specified intents or default ones if none were provided
 */
export function getClient(intents?: BitFieldResolvable<GatewayIntentsString, number>) {
    return new Client({
        intents: intents || [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.MessageContent
        ]
    });
}