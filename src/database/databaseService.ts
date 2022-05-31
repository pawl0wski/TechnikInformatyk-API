import { Sequelize } from "sequelize-typescript";
import DatabaseConfig from "./config/config";
import Exam from "./models/exam.model";
import ExamQuestion from "./models/examquestion.model";
import Question from "./models/question.model";
import Report from "./models/report.model";

export default class DatabaseService {
    private sequelize: Sequelize;
    private databaseConfig: DatabaseConfig;

    constructor() {
        this.databaseConfig = new DatabaseConfig({});
        this.sequelize = new Sequelize(
            this.databaseConfig.generateConnectionPath(),
            { models: [Exam, ExamQuestion, Question, Report], logging: false }
        );
    }

    async sync() {
        await this.sequelize.sync();
    }
}
