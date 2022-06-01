import { Request, Response } from "express";
import DatabaseService from "../../database/databaseService";
import QuestionsAdapter from "../../adapters/questionsAdapter";

async function getQuestions(req: Request, res: Response) {
    const databaseServiceInstance = DatabaseService.getInstance();
    const questions = await databaseServiceInstance.getAllExamsWithAdapter();

    res.json(questions.adapt());
}

export default getQuestions;
