import { Sequelize } from "sequelize-typescript";
import DatabaseConfig from "./config/config";

export default class DatabaseService {
    private sequelize: Sequelize;
    private databaseConfig: DatabaseConfig;

    constructor() {
        this.databaseConfig = new DatabaseConfig({});
        this.sequelize = new Sequelize(
            this.databaseConfig.generateConnectionPath(),
            { models: [__dirname + "/**/*.model.ts"], logging: false }
        );
    }

    async sync() {
        await this.sequelize.sync();
    }
}
