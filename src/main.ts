import * as dotenv from "dotenv";
import { Command } from "commander";
import restoreCommand from "./commands/restore";
import backupCommand from "./commands/backup";
import rebuildCDN from "./commands/rebuildCDN";
import serverCommand from "./commands/server";
import generateKeyCommand from "./commands/generateKey";

dotenv.config();
const program = new Command();

program.name("Technik Informatyk API");

program
    .command("restore")
    .description("Restore all data by json files.")
    .argument("<string>", "directory with all json files")
    .action(restoreCommand);

program
    .command("backup")
    .description("Backup all data to json files.")
    .argument("<string>", "output directory")
    .action(backupCommand);

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
