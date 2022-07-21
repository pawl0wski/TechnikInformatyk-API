import Snapshot from "../services/snapshot/snapshot";
import express from "express";
import morgan from "morgan";
import chalk from "chalk";
import Database from "../database/database";
import EnvironmentConfiguration from "../config/environmentConfig";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../routes";
import SwaggerDoc from "../swagger.json";
import CacheService from "../services/cacheService/cacheService";
import CacheConfig from "../services/cacheService/config/cacheConfig";

async function serverCommand() {
    const PORT = process.env.SERVER_PORT || 3000;
    CacheService.getInstance(CacheConfig.fromEnv());
    const database = Database.getInstance();
    await database.sync();
    if (EnvironmentConfiguration.snapshotEnabled)
        await new Snapshot({}).rebuild({ verbose: true });
    const app = express();
    await database.updateDatabaseChecksum();

    app.use(express.json());
    app.use(morgan("short"));
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(SwaggerDoc));
    app.set("trust proxy", true);
    RegisterRoutes(app);

    app.listen(PORT, () => {
        console.log(
            chalk.green(`Api running on url: http://localhost:${PORT}`)
        );
    });
}

export default serverCommand;
