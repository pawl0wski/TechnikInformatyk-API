import { Get, Route, Security, Tags } from "tsoa";
import { Controller } from "@tsoa/runtime";
import Database from "../../database/database";
import DatabaseVersionResponse from "../../interfaces/databaseVersionResponse";

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
    public async getDatabaseVersion(): Promise<DatabaseVersionResponse> {
        return {
            version: this._database.checksum,
        };
    }
}
