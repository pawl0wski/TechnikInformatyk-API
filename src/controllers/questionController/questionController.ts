import { Get, Path, Request, Route, Security, Tags } from "tsoa";
import { Controller } from "@tsoa/runtime";
import QuestionRepository from "../../repositories/questionRepository/questionRepository";
import QuestionResponseI from "../../interfaces/questionResponse";
import express from "express";
import CachedEndpoint from "../../services/cacheService/decorators/cachedEndpoint";
import EnvironmentConfig from "../../config/environmentConfig";
import SnapshotService from "../../services/snapshotService/snapshotService";
import NotFoundError from "../../errors/notFoundError";

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
    @CachedEndpoint("question")
    public async getExams(): Promise<QuestionResponseI[]> {
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
        }) as QuestionResponseI[];
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
