import * as dotenv from "dotenv";
import express from "express";
import DatabaseService from "./database/databaseService";
import { Command } from "commander";

dotenv.config();
let databaseService = new DatabaseService();
const PORT = process.env.SERVER_PORT || 3000;
const program = new Command();

program.name("TechnikInformatyk API");

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
