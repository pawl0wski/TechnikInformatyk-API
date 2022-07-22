import * as dotenv from "dotenv";
import { Command } from "commander";
import rebuildSnapshot from "./commands/rebuildSnapshot";
import serverCommand from "./commands/server";
import generateKeyCommand from "./commands/generateKey";
import showKeys from "./commands/showKeys";

dotenv.config();
const program = new Command();

program.name("Technik Informatyk API");

program
    .command("rebuildSnapshot")
    .description("Rebuild snapshot folder.")
    .action(rebuildSnapshot);

program
    .command("generateKey")
    .description("Generate api key")
    .argument("<string>", "admin|client")
    .action(generateKeyCommand);

program.command("showKeys").description("Show all api keys").action(showKeys);

program
    .command("server")
    .description("Run Express server")
    .action(serverCommand);

program.parse();
