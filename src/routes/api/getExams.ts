import { Request, Response } from "express";
import Api from "../../api/api";

async function getExams(req: Request, res: Response) {
    const api = Api.getInstance();
    const exams = await api.getAllExamsWithAdapter();

    res.json(exams.adapt());
}

export default getExams;
