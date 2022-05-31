import { Sequelize } from "sequelize";

export default class DatabaseService {
    private sequelize: Sequelize;

    constructor() {
        const connectionPath = process.env["MYSQL_CONNECTION_PATH"];
        if (!connectionPath) {
            throw new Error("MYSQL_CONNECTION_PATH not definied");
        }
        this.sequelize = new Sequelize(connectionPath);
    }
}
