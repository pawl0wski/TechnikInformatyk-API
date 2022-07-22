import { Get, Route, Security, Tags } from "tsoa";
import { Controller } from "@tsoa/runtime";
import ExamRepository from "../../repositories/examRepository/examRepository";
import ExamResponseI from "../../interfaces/examResponse";
import Database from "../../database/database";
import DatabaseVersionResponseI from "../../interfaces/databaseVersionResponseI";

@Route("database-version")
@Tags("Other")
export class DatabaseVersionController extends Controller {
    private readonly _database: Database;

    constructor(database?: Database) {
        super();
        if (database === undefined) database = Database.getInstance();
        this._database = database;
    }

    @Get("")
    @Security("api_key", ["client"])
    public async getDatabaseVersion(): Promise<DatabaseVersionResponseI> {
        return {
            version: this._database.checksum,
        };
    }
}
