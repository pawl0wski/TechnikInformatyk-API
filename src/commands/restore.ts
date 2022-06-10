import chalk from "chalk";
import QuestionRestore from "../backup/restore/questionRestore";
import ExamRestore from "../backup/restore/examRestore";
import Exam from "../database/models/exam.model";
import Question from "../database/models/question.model";
import Database from "../database/database";

async function restoreCommand(str: string) {
    const database = Database.getInstance();
    await database.sync();

    console.log(chalk.gray("Restoring data..."));
    const questionRestorer = new QuestionRestore(str);
    const examRestorer = new ExamRestore(str);

    const exam: Exam[] = await examRestorer.restore();
    console.log(chalk.green(`Restored ${exam.length} exams.`));

    const question: Question[] = await questionRestorer.restore();
    console.log(chalk.green(`Restored ${question.length} questions.`));

    process.stdout.write("Calculating database checksum: ");
    await database.updateDatabaseChecksum();
    process.stdout.write(chalk.green(database.getChecksum) + "\n");

    console.log(chalk.gray("Wait a second..."));
}

export default restoreCommand;
