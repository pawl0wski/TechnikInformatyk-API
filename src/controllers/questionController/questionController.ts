import { Get, Path, Request, Route, Security, Tags } from "tsoa";
import { Controller } from "@tsoa/runtime";
import QuestionRepository from "../../repositories/questionRepository/questionRepository";
import QuestionResponse from "../../interfaces/questionResponse";
import express from "express";
import EnvironmentConfig from "../../config/environmentConfig";
import SnapshotService from "../../services/snapshotService/snapshotService";
import NotFoundError from "../../errors/notFoundError";
import useCache from "../../services/cacheService/functions/useCache";

@Route("question")
@Tags("Question")
export class QuestionController extends Controller {
    private readonly _repository: QuestionRepository;

    constructor(repository?: QuestionRepository) {
        super();
        if (repository === undefined) repository = new QuestionRepository();
        this._repository = repository;
    }

    @Get("")
    @Security("api_key", ["client"])
    public async getExams(): Promise<QuestionResponse[]> {
        return (await useCache("question", async () => {
            const questions = await this._repository.getQuestions();

            return questions.map((question) => {
                const {
                    uuid,
                    content,
                    answerA,
                    answerB,
                    answerC,
                    answerD,
                    correctAnswer,
                    exams,
                    image,
                } = question;
                return {
                    uuid,
                    content,
                    answerA,
                    answerB,
                    answerC,
                    answerD,
                    correctAnswer,
                    haveImage: image !== null,
                    examUuids: exams.map((exam) => exam.uuid),
                };
            }) as QuestionResponse[];
        })) as QuestionResponse[];
    }

    @Get("{uuid}/image")
    @Security("api_key", ["client"])
    public async getQuestionImage(
        @Path("uuid") uuid: string,
        @Request() req: express.Request
    ) {
        const res = req.res;
        if (res === undefined) throw new NotFoundError();

        if (EnvironmentConfig.snapshotEnabled) {
            const snapshotService = new SnapshotService({});
            res.redirect(snapshotService.getUrlToImage(uuid));
        } else {
            const image = await this._repository.getImageForQuestion(uuid);
            if (image === null) throw new NotFoundError();
            res.type("jpg");
            res.send(image);
        }
    }
}
