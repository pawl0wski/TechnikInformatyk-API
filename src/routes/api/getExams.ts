import { Request, Response } from "express";
import Database from "../../database/database";

async function getExams(req: Request, res: Response) {
    const databaseInstance = Database.getInstance();
    const exams = await databaseInstance.getAllExamsWithAdapter();

    res.json(exams.adapt());
}

export default getExams;
