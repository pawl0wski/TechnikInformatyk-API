import { Request, Response } from "express";
import Question from "../../database/models/question.model";
import Snapshot from "../../services/snapshot/snapshot";
import EnvironmentConfiguration from "../../environmentConfiguration";

async function getImage(req: Request, res: Response) {
    const questionUuid: string = req.params.uuid;
    if (!EnvironmentConfiguration.snapshotEnabled) {
        const question = await Question.findOne({
            where: { uuid: questionUuid },
        });
        if (!question) {
            res.status(404).type("txt").send("Not found");
        } else {
            res.type("jpg").send(question.image);
        }
    } else {
        const cdn = new Snapshot({});
        res.redirect(cdn.getUrlToImage(questionUuid));
    }
}

export default getImage;
