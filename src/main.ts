import * as dotenv from "dotenv";
import express from "express";
import DatabaseService from "./database/databaseService";
dotenv.config();

let databaseService = new DatabaseService();
const PORT = process.env.SERVER_PORT || 3000;

const app = express();

async function init() {
    await databaseService.sync();
    app.listen(PORT, () => {
        console.log(`App started http://localhost:${PORT}`);
    });
}

init();
