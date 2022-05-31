import * as dotenv from "dotenv";
import DatabaseService from "./database/databaseService";
dotenv.config();

let databaseService = new DatabaseService()