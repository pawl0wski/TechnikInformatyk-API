import { Sequelize } from "sequelize-typescript";
import DatabaseConfig from "./config/config";
import Exam from "./models/exam.model";
import ExamQuestion from "./models/examquestion.model";
import Question from "./models/question.model";
import Report from "./models/report.model";

export default class DatabaseService {
    private static instance: DatabaseService;
    private sequelize: Sequelize;
    private databaseConfig: DatabaseConfig;

    private constructor() {
        this.databaseConfig = new DatabaseConfig({});
        this.sequelize = new Sequelize(
            this.databaseConfig.generateConnectionPath(),
            {
                models: [Exam, ExamQuestion, Question, Report],
                define: { timestamps: false },
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

    async getAllExams(): Promise<Exam[]> {
        return await Exam.findAll();
    }
    async getAllQuestions(): Promise<Question[]> {
        return await Question.findAll({ include: Exam });
    }
}
