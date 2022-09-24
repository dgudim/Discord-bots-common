import { Client } from "discord.js";
import { DKRCommands } from "dkrcommands";
import path = require("path");
import { colors, wrap } from "./colors";
import { error, info, warn } from "./logger";

export function testEnvironmentVar(var_name: string, exit: boolean) {
    if (!process.env[var_name]) {
        if (exit) {
            error(`${wrap(var_name, colors.LIGHTER_BLUE)} environment variable is not set, can't proceed`);
            process.exit(1);
        } else {
            warn(`consider setting ${wrap(var_name, colors.LIGHT_YELLOW)} environment variable`);
        }
    }
}

export function dkrInit(client: Client, project_root_dir: string) {
    const handler = new DKRCommands(client, {
        commandsDir: path.join(project_root_dir, 'commands'),
        typeScript: true,
        botOwners: process.env.OWNERS?.split(","),
        testServers: process.env.TEST_SERVERS?.split(",")
    });

    info(`${wrap("💁 Client ready", colors.LIGHT_YELLOW)}`);
    return handler;
}