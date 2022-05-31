import { Request, Response } from "express";
import DatabaseService from "../../database/databaseService";

async function getExams(req: Request, res: Response) {
    const databaseServiceInstance = DatabaseService.getInstance();
    const exams = await databaseServiceInstance.getAllExams();

    res.json(exams);
}

export default getExams;
