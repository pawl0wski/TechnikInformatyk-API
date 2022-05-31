import { Request, Response } from "express";
import Question from "../../database/models/question.model";

async function getImage(req: Request, res: Response) {
    const questionUuid: string = req.params.uuid;
    const question = await Question.findOne({ where: { uuid: questionUuid } });
    if (!question) {
        res.status(404).type("txt").send("Not found");
    } else {
        res.type("jpg").send(question.image);
    }
}

export default getImage;
