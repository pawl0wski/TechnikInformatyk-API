import { Request, Response } from "express";
import DatabaseService from "../../database/databaseService";
import QuestionsApiAdapter from "./adapters/questionsApiAdapter";

async function getQuestions(req: Request, res: Response) {
    const databaseServiceInstance = DatabaseService.getInstance();
    const questions = await databaseServiceInstance.getAllQuestions();
    const questionsApiAdapter = new QuestionsApiAdapter(questions);

    res.json(questionsApiAdapter.getAsApiObject());
}

export default getQuestions;
