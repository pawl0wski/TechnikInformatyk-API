import { Request, Response } from "express";
import Database from "../../database/database";

function getDatabaseVersion(req: Request, res: Response) {
    const database = Database.getInstance();
    res.json({
        version: database.getChecksum,
    });
}

export default getDatabaseVersion;
