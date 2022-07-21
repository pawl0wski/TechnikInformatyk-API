import SnapshotService from "../services/snapshot/snapshotService";
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

async function initializeSingletons() {
    const cache = CacheService.getInstance(CacheConfig.fromEnv());
    await cache.connectToRedis();

    const database = Database.getInstance();
    await database.sync();
    await database.updateDatabaseChecksum();

    if (EnvironmentConfiguration.snapshotEnabled)
        await new SnapshotService({}).rebuild({ verbose: true });
}

function initializeExpress(): express.Express {
    const app = express();

    app.use(express.json());
    app.use(morgan("short"));
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(SwaggerDoc));
    app.set("trust proxy", true);
    RegisterRoutes(app);

    return app;
}

async function serverCommand() {
    await initializeSingletons();
    const app = initializeExpress();
    const PORT = EnvironmentConfiguration.serverPort;

    app.listen(PORT, () => {
        console.log(
            chalk.green(`Api running on url: http://localhost:${PORT}`)
        );
    });
}

export default serverCommand;
