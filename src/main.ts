import * as dotenv from "dotenv";
import { Command } from "commander";
import rebuildCDN from "./commands/rebuildCDN";
import serverCommand from "./commands/server";
import generateKeyCommand from "./commands/generateKey";

dotenv.config();
const program = new Command();

program.name("Technik Informatyk API");

program
    .command("rebuildCDN")
    .description("Rebuild CDN folder.")
    .action(rebuildCDN);

program
    .command("generateKey")
    .description("Generate api key")
    .argument("<string>", "admin|client")
    .action(generateKeyCommand);

program
    .command("server")
    .description("Run Express server")
    .action(serverCommand);

program.parse();
