import { Request, Response } from "express";
import Api from "../../api/api";

async function getQuestions(req: Request, res: Response) {
    const api = Api.getInstance();
    const questions = await api.getAllQuestionsWithAdapter();

    res.json(questions.adapt());
}

export default getQuestions;
