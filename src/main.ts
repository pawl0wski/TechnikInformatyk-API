import * as dotenv from "dotenv";
import express from "express";
import Database from "./database/database";
import { Command } from "commander";
import Exam from "./database/models/exam.model";
import QuestionRestore from "./backup/restore/questionRestore";
import ExamRestore from "./backup/restore/examRestore";
import Question from "./database/models/question.model";
import chalk from "chalk";
import CDN from "./cdn/cdn";
import morgan from "morgan";
import QuestionBackup from "./backup/backup/questionBackup";
import ExamBackup from "./backup/backup/examBackup";
import { existsSync, mkdirSync } from "fs";
import Api from "./api/api";

dotenv.config();
let database = Database.getInstance();
const PORT = process.env.SERVER_PORT || 3000;
const program = new Command();

program.name("TechnikInformatyk API");

program
    .command("restore")
    .description("Restore all data by json files.")
    .argument("<string>", "directory with all json files")
    .action(async (str) => {
        await database.sync();

        console.log(chalk.gray("Restoring data..."));
        const questionRestorer = new QuestionRestore(str);
        const examRestorer = new ExamRestore(str);

        let exam: Exam[] = await examRestorer.restore();
        console.log(chalk.green(`Restored ${exam.length} exams.`));

        let question: Question[] = await questionRestorer.restore();
        console.log(chalk.green(`Restored ${question.length} questions.`));

        process.stdout.write("Calculating database checksum: ");
        await database.updateDatabaseChecksum();
        process.stdout.write(chalk.green(database.getChecksum) + "\n");

        console.log(chalk.gray("Wait a second..."));
    });

program
    .command("backup")
    .description("Backup all data to json files.")
    .argument("<string>", "output directory")
    .action(async (str) => {
        Database.getInstance();
        const questionBackup = new QuestionBackup(str);
        const examBackup = new ExamBackup(str);

        if (!existsSync(str)) {
            mkdirSync(str);
        }

        process.stdout.write("Creating backup for Exams ");
        await examBackup.backup();
        process.stdout.write(chalk.green("OK\n"));

        process.stdout.write("Creating backup for Questions ");
        await questionBackup.backup();
        process.stdout.write(chalk.green("OK\n"));
    });

program
    .command("rebuildCDN")
    .description("Rebuild CDN folder.")
    .action(async (str) => {
        await new CDN({}).rebuild({ verbose: true });
    });

program
    .command("server")
    .description("Run Express server")
    .action(async (str, options) => {
        await database.sync();
        if (CDN.isCDNEnabled) await new CDN({}).rebuild({ verbose: true });
        const app = express();
        await database.updateDatabaseChecksum();
        const apiInstance = Api.getInstance();
        await apiInstance.initializeApi();

        app.use(express.json());
        app.use(morgan("short"));
        app.use("/api", apiInstance.expressRouter);

        app.listen(PORT, () => {
            console.log(
                chalk.green(`Api running on url: http://localhost:${PORT}`)
            );
        });
    });

program.parse();
