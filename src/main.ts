import * as dotenv from "dotenv";
import express from "express";
import DatabaseService from "./database/databaseService";
import { Command } from "commander";
import Exam from "./database/models/exam.model";
import QuestionRestorer from "./backup/restorer/questionRestorer";
import ExamRestorer from "./backup/restorer/examRestorer";
import path from "path";
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
    .action(async (str, options) => {
        const questionRestorer = new QuestionRestorer();
        const examRestorer = new ExamRestorer();
        let exam: Exam[] = await examRestorer.restore(
            path.join(str, "Exam.json")
        );
        console.log(chalk.green(`Restored ${exam.length} exams.`));
        let question: Question[] = await questionRestorer.restore(
            path.join(str, "Question.json")
        );
        console.log(chalk.green(`Restored ${question.length} questions.`));
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
