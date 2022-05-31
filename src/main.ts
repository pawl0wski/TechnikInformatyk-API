import * as dotenv from "dotenv";
import express from "express";
import DatabaseService from "./database/databaseService";
import { Command } from "commander";
import Exam from "./database/models/exam.model";
import QuestionRestorer from "./backup/restorer/questionRestorer";
import ExamRestorer from "./backup/restorer/examRestorer";
import Question from "./database/models/question.model";
import chalk from "chalk";
import apiRouter from "./routes/api/api";
import CDN from "./cdn/cdn";

dotenv.config();
let databaseService = DatabaseService.getInstance();
const PORT = process.env.SERVER_PORT || 3000;
const program = new Command();

program.name("TechnikInformatyk API");

program
    .command("restore")
    .description("Restore all data by json files.")
    .argument("<string>", "directory with all json files")
    .action(async (str) => {
        await databaseService.sync();
        console.log(chalk.gray("Restoring data..."));
        const questionRestorer = new QuestionRestorer(str);
        const examRestorer = new ExamRestorer(str);
        let exam: Exam[] = await examRestorer.restore();
        console.log(chalk.green(`Restored ${exam.length} exams.`));
        let question: Question[] = await questionRestorer.restore();
        console.log(chalk.green(`Restored ${question.length} questions.`));
        console.log(chalk.gray("Wait a second..."));
    });

program
    .command("backup")
    .description("Backup all data to json files.")
    .argument("<string>", "output directory")
    .action(async (str) => {
        console.log(chalk.red("Not implemented yet"));
    });

program
    .command("rebuildCDN")
    .description("Rebuild cdn folder.")
    .action(async (str) => {
        await new CDN().rebuild({ verbose: true });
    });

program
    .command("server")
    .description("Run Express server")
    .action(async (str, options) => {
        await databaseService.sync();
        await new CDN().rebuildIfCDNEnabled({ verbose: true });
        const app = express();

        app.use(express.json());
        app.use("/api", apiRouter);

        app.listen(PORT, () => {
            console.log(`App started http://localhost:${PORT}`);
        });
    });

program.parse();
