import { Sequelize } from "sequelize-typescript";
import DatabaseConfig from "./config/config";
import Exam from "./models/exam.model";
import ExamQuestion from "./models/examquestion.model";
import Question from "./models/question.model";
import Report from "./models/report.model";
import mariadb from "mariadb";
import QuestionsAdapter from "../adapters/questionsAdapter";
import ExamsAdapter from "../adapters/examsAdapter";

export interface DatabaseServiceI {
    sync(): Promise<void>;
    updateDatabaseChecksum(): Promise<number>;
    get getChecksum(): number;
    getAllExamsWithAdapter(): Promise<ExamsAdapter>;
    getAllQuestionsWithAdapter(): Promise<QuestionsAdapter>;
}

export default class DatabaseService implements DatabaseServiceI {
    private static instance: DatabaseService;
    private sequelize: Sequelize;
    private databaseConfig: DatabaseConfig;
    private databaseChecksum: number = 0;

    private constructor() {
        this.databaseConfig = new DatabaseConfig({});
        this.sequelize = new Sequelize(
            this.databaseConfig.generateConnectionPath(),
            {
                dialectModule: mariadb,
                models: [Exam, ExamQuestion, Question, Report],
                define: { timestamps: false },
                logging: false,
            }
        );
    }

    public static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    async sync() {
        await this.sequelize.sync();
    }

    async updateDatabaseChecksum(): Promise<number> {
        const queryResult = await this.sequelize.query(
            "CHECKSUM TABLE Exams, ExamQuestions, Questions;"
        );
        const checksums = queryResult[0] as {
            Table: string;
            Checksum: number;
        }[];

        let tmpChecksum = 0;
        for (let row of checksums) {
            tmpChecksum += row.Checksum;
        }
        this.databaseChecksum = tmpChecksum;
        return this.databaseChecksum;
    }

    get getChecksum(): number {
        return this.databaseChecksum;
    }

    async getAllExamsWithAdapter(): Promise<ExamsAdapter> {
        const exams = await Exam.findAll();
        return new ExamsAdapter(exams);
    }

    async getAllQuestionsWithAdapter(): Promise<QuestionsAdapter> {
        const questions = await Question.findAll({ include: Exam });
        return new QuestionsAdapter(questions);
    }
}
