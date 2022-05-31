import * as dotenv from "dotenv";
import express from "express";
import DatabaseService from "./database/databaseService";
import { Command } from "commander";
import Restorer from "./backup/restorer";
import chalk from "chalk";
import Exam from "./database/models/exam.model";

dotenv.config();
let databaseService = new DatabaseService();
const PORT = process.env.SERVER_PORT || 3000;
const program = new Command();

program.name("TechnikInformatyk API");

program
    .command("restore")
    .description("Restore all data by json files.")
    .argument("<string>", "directory with all json files")
    .action(async (str, options) => {
        await new Restorer().restoreAll(str, {
            verbose: true,
        });
    });

program
    .command("server")
    .description("Run Express server")
    .action(async (str, options) => {
        const app = express();
        await databaseService.sync();
        app.listen(PORT, () => {
            console.log(`App started http://localhost:${PORT}`);
        });
    });

program.parse();
