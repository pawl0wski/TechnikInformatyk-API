import { Request, Response } from "express";
import DatabaseService from "../../database/databaseService";
import QuestionsAdapter from "../../adapters/questionsAdapter";

async function getQuestions(req: Request, res: Response) {
    const databaseServiceInstance = DatabaseService.getInstance();
    const questions = await databaseServiceInstance.getAllQuestions();
    const questionsApiAdapter = new QuestionsAdapter(questions);

    res.json(questionsApiAdapter.adapt());
}

export default getQuestions;
