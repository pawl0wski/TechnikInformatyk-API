import Database from "../database/database";
import QuestionBackup from "../backup/backup/questionBackup";
import ExamBackup from "../backup/backup/examBackup";
import { existsSync, mkdirSync } from "fs";
import chalk from "chalk";

async function backupCommand(str: string) {
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
}

export default backupCommand;
