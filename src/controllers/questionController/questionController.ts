import { Body, Get, Path, Put, Request, Route, Security, Tags } from "tsoa";
import { Controller } from "@tsoa/runtime";
import QuestionRepository from "../../repositories/questionRepository/questionRepository";
import QuestionResponse from "../../interfaces/questionResponse";
import express from "express";
import EnvironmentConfig from "../../config/environmentConfig";
import SnapshotService from "../../services/snapshotService/snapshotService";
import NotFoundError from "../../errors/notFoundError";
import useCache from "../../services/cacheService/functions/useCache";
import QuestionRequest from "../../interfaces/questionRequest";
import { QuestionToResponse } from "./questionToResponse/questionToResponse";

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
    public async getQuestion(): Promise<QuestionResponse[]> {
        return (await useCache("question", async () => {
            const questions = await this._repository.getQuestions();

            return questions.map((question) => {
                return new QuestionToResponse(question).toResponse();
            }) as QuestionResponse[];
        })) as QuestionResponse[];
    }

    @Put("{uuid}")
    @Security("api_key", ["admin"])
    public async putQuestion(
        @Path("uuid") questionUuid: string,
        @Body() questionRequest: QuestionRequest
    ): Promise<QuestionResponse> {
        const question = await this._repository.updateQuestion(
            questionUuid,
            questionRequest
        );
        return new QuestionToResponse(question).toResponse();
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
