import { Request, Response } from "express";
import Database from "../../database/database";

async function getQuestions(req: Request, res: Response) {
    const databaseInstance = Database.getInstance();
    const questions = await databaseInstance.getAllQuestionsWithAdapter();

    res.json(questions.adapt());
}

export default getQuestions;
