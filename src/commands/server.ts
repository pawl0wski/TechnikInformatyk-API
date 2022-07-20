import Snapshot from "../services/snapshot/snapshot";
import express from "express";
import Api from "../api/api";
import morgan from "morgan";
import chalk from "chalk";
import Database from "../database/database";
import apiKeyMiddleware from "../middlewares/apiKeyMiddleware";
import EnvironmentConfiguration from "../environmentConfiguration";

async function serverCommand() {
    const PORT = process.env.SERVER_PORT || 3000;
    const database = Database.getInstance();
    await database.sync();
    if (EnvironmentConfiguration.snapshotEnabled)
        await new Snapshot({}).rebuild({ verbose: true });
    const app = express();
    await database.updateDatabaseChecksum();
    const apiInstance = Api.getInstance();
    await apiInstance.initializeApi();

    app.use(express.json());
    app.use(morgan("short"));
    app.use(apiKeyMiddleware);
    app.use("/api", apiInstance.expressRouter);
    app.set("trust proxy", true);

    app.listen(PORT, () => {
        console.log(
            chalk.green(`Api running on url: http://localhost:${PORT}`)
        );
    });
}

export default serverCommand;
