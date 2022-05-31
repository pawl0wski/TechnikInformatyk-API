import { Sequelize } from "sequelize";
import DatabaseConfig from "./config/config";

export default class DatabaseService {
    private sequelize: Sequelize;
    private databaseConfig: DatabaseConfig;

    constructor() {
        this.databaseConfig = new DatabaseConfig({});
        this.sequelize = new Sequelize(
            this.databaseConfig.generateConnectionPath()
        );
    }
}
