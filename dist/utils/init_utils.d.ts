import { Client } from "discord.js";
import { DKRCommands } from "dkrcommands";
export declare function testEnvironmentVar(var_name: string, exit: boolean): void;
export declare function dkrInit(client: Client, project_root_dir: string): DKRCommands;