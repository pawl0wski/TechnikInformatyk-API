import { Sequelize } from "sequelize-typescript";
import DatabaseConfig from "./config/config";
import Exam from "./models/exam.model";
import ExamQuestion from "./models/examquestion.model";
import Question from "./models/question.model";
import Report from "./models/report.model";
import mariadb from "mariadb";
import ApiKey from "./models/apiKey.model";
import randomstring from "randomstring";

export enum Privilege {
    client = "client",
    admin = "admin",
}

export interface DatabaseI {
    sync(): Promise<void>;
    updateDatabaseChecksum(): Promise<number>;
    get getChecksum(): number;
}

export default class Database implements DatabaseI {
    private static instance: Database;
    private sequelize: Sequelize;
    private databaseConfig: DatabaseConfig;
    private databaseChecksum: number = 0;

    private constructor() {
        this.databaseConfig = new DatabaseConfig({});
        this.sequelize = new Sequelize(
            this.databaseConfig.generateConnectionPath(),
            {
                dialectModule: mariadb,
                models: [Exam, ExamQuestion, Question, Report, ApiKey],
                define: { timestamps: false },
                logging: false,
            }
        );
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
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

    public async generateApiKey(privilege: Privilege): Promise<ApiKey> {
        const key = randomstring.generate(32);
        return await ApiKey.create({ key, privilege });
    }

    public async getApiKeyPrivilege(key: string): Promise<Privilege | null> {
        const apiKey = await ApiKey.findOne({ where: { key } });
        if (apiKey === null) return null;
        return (<any>Privilege)[apiKey.privilege];
    }
}
