import * as dotenv from "dotenv";
import express from "express";
import DatabaseService from "./database/databaseService";
import { Command } from "commander";
import Exam from "./database/models/exam.model";
import QuestionRestorer from "./backup/restorer/questionRestorer";
import ExamRestorer from "./backup/restorer/examRestorer";
import Question from "./database/models/question.model";
import chalk from "chalk";

dotenv.config();
let databaseService = new DatabaseService();
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
    .action(async (str) => {});

program
    .command("server")
    .description("Run Express server")
    .action(async (str, options) => {
        await databaseService.sync();
        const app = express();
        app.listen(PORT, () => {
            console.log(`App started http://localhost:${PORT}`);
        });
    });

program.parse();
