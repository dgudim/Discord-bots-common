"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = exports.dkrInit = exports.getEnvironmentVar = exports.testEnvironmentVar = void 0;
const discord_js_1 = require("discord.js");
const dkrcommands_1 = require("dkrcommands");
const path = require("path");
const colors_1 = require("./colors");
const logger_1 = require("./logger");
const utils_1 = require("./utils");
/**
 * Test if an environment variable is set
 * @param var_name Environment variable name
 * @param exit Whether to exit if the variable is not set
 * @param is_file Whether the variable should point to a file
 */
function testEnvironmentVar(var_name, exit, is_file) {
    if (!process.env[var_name]) {
        if (exit) {
            (0, logger_1.error)(`${(0, colors_1.wrap)(var_name, colors_1.colors.LIGHTER_BLUE)} environment variable is not set, can't proceed`);
            process.exit(1);
        }
        else {
            (0, logger_1.warn)(`consider setting ${(0, colors_1.wrap)(var_name, colors_1.colors.BLUE)} environment variable`);
        }
    }
    else if (is_file && !(0, utils_1.isFile)(process.env[var_name])) {
        if (exit) {
            (0, logger_1.error)(`${(0, colors_1.wrap)(var_name, colors_1.colors.LIGHTER_BLUE)} does not point to a file, can't proceed`);
            process.exit(1);
        }
        else {
            (0, logger_1.warn)(`consider pointing ${(0, colors_1.wrap)(var_name, colors_1.colors.BLUE)} to file`);
        }
    }
}
exports.testEnvironmentVar = testEnvironmentVar;
/**
 * Get an environment variable
 * @param var_name Environment variable name
 * @param default_value Fallback value
 * @returns Variable contents of fallback value
 */
function getEnvironmentVar(var_name, default_value = "") {
    return process.env[var_name] || default_value;
}
exports.getEnvironmentVar = getEnvironmentVar;
/**
 * Get DKRCommands commands handler instance
 * @param client A discord bot client instance
 * @param project_root_dir Project root directory (__dirname)
 * @returns DKRCommands commands handler instance
 */
function dkrInit(client, project_root_dir) {
    const handler = new dkrcommands_1.DKRCommands(client, {
        commandsDir: path.join(project_root_dir, "commands"),
        typeScript: true,
        botOwners: process.env.OWNERS?.split(","),
        testServers: process.env.TEST_SERVERS?.split(",")
    });
    (0, logger_1.info)(`${(0, colors_1.wrap)("💁 Client ready", colors_1.colors.LIGHT_YELLOW)}`);
    return handler;
}
exports.dkrInit = dkrInit;
/**
 * Get a discord bot client instance
 * @param intents Bot intents
 * @returns A discord bot client instance with specified intents or default ones if none were provided
 */
function getClient(intents) {
    return new discord_js_1.Client({
        intents: intents || [
            discord_js_1.GatewayIntentBits.Guilds,
            discord_js_1.GatewayIntentBits.GuildMembers,
            discord_js_1.GatewayIntentBits.GuildMessages,
            discord_js_1.GatewayIntentBits.GuildMessageReactions,
            discord_js_1.GatewayIntentBits.MessageContent
        ]
    });
}
exports.getClient = getClient;
