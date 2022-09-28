"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dkrInit = exports.getEnvironmentVar = exports.testEnvironmentVar = void 0;
const dkrcommands_1 = require("dkrcommands");
const path = require("path");
const colors_1 = require("./colors");
const logger_1 = require("./logger");
function testEnvironmentVar(var_name, exit) {
    if (!process.env[var_name]) {
        if (exit) {
            (0, logger_1.error)(`${(0, colors_1.wrap)(var_name, colors_1.colors.LIGHTER_BLUE)} environment variable is not set, can't proceed`);
            process.exit(1);
        }
        else {
            (0, logger_1.warn)(`consider setting ${(0, colors_1.wrap)(var_name, colors_1.colors.LIGHT_YELLOW)} environment variable`);
        }
    }
}
exports.testEnvironmentVar = testEnvironmentVar;
function getEnvironmentVar(var_name, default_value = "") {
    return process.env[var_name] || default_value;
}
exports.getEnvironmentVar = getEnvironmentVar;
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
