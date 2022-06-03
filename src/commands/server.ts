import CDN from "../cdn/cdn";
import express from "express";
import Api from "../api/api";
import morgan from "morgan";
import chalk from "chalk";
import Database from "../database/database";
import apiKeyMiddleware from "../middlewares/apiKeyMiddleware";

async function serverCommand() {
    const PORT = process.env.SERVER_PORT || 3000;
    const database = Database.getInstance();
    await database.sync();
    if (CDN.isCDNEnabled) await new CDN({}).rebuild({ verbose: true });
    const app = express();
    await database.updateDatabaseChecksum();
    const apiInstance = Api.getInstance();
    await apiInstance.initializeApi();

    app.use(express.json());
    app.use(apiKeyMiddleware);
    app.use(morgan("short"));
    app.use("/api", apiInstance.expressRouter);
    app.set("trust proxy", true);

    app.listen(PORT, () => {
        console.log(
            chalk.green(`Api running on url: http://localhost:${PORT}`)
        );
    });
}

export default serverCommand;
