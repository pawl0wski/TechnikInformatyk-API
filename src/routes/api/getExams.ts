import { Request, Response } from "express";
import DatabaseService from "../../database/databaseService";
import ExamsApiAdapter from "./adapters/examsApiAdapter";

async function getExams(req: Request, res: Response) {
    const databaseServiceInstance = DatabaseService.getInstance();
    const exams = await databaseServiceInstance.getAllExams();
    const examsApiAdapter = new ExamsApiAdapter(exams);

    res.json(examsApiAdapter.getAsApiObject());
}

export default getExams;
