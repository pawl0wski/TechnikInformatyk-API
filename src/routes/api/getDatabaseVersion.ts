import { Request, Response } from "express";
import DatabaseService from "../../database/databaseService";

function getDatabaseVersion(req: Request, res: Response) {
    const databaseService = DatabaseService.getInstance();
    res.json({
        version: databaseService.getChecksum(),
    });
}

export default getDatabaseVersion;
