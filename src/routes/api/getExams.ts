import { Request, Response } from "express";
import DatabaseService from "../../database/databaseService";
import ExamsAdapter from "../../adapters/examsAdapter";

async function getExams(req: Request, res: Response) {
    const databaseServiceInstance = DatabaseService.getInstance();
    const exams = await databaseServiceInstance.getAllExamsWithAdapter();

    res.json(exams.adapt());
}

export default getExams;
