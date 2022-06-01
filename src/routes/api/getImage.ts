import { Request, Response } from "express";
import Question from "../../database/models/question.model";
import CDN from "../../cdn/cdn";

async function getImage(req: Request, res: Response) {
    const questionUuid: string = req.params.uuid;
    if (!CDN.isCDNEnabled) {
        const question = await Question.findOne({
            where: { uuid: questionUuid },
        });
        if (!question) {
            res.status(404).type("txt").send("Not found");
        } else {
            res.type("jpg").send(question.image);
        }
    } else {
        const cdn = new CDN({});
        res.redirect(cdn.getUrlToImage(questionUuid));
    }
}

export default getImage;
