import { Get, Path, Route, Tags, Request } from "tsoa";
import { Controller } from "@tsoa/runtime";
import QuestionRepository from "../../repositories/questionRepository/questionRepository";
import QuestionResponseI from "../../interfaces/questionResponse";
import express from "express";
import CacheEndpoint from "../../services/cacheService/decorators/cacheEndpoint";

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
    @CacheEndpoint("question")
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
    public async getQuestionImage(
        @Path("uuid") uuid: string,
        @Request() req: express.Request
    ) {
        const image = await this._repository.getImageForQuestion(uuid);
        if (image === null) return "Not Found";
        const res = req.res;
        res?.type("jpg");
        res?.send(image);
    }
}
