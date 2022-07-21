import { Get, Request, Route, Tags } from "tsoa";
import { Controller } from "@tsoa/runtime";
import ExamRepository from "../../repositories/examRepository/examRepository";
import ExamResponseI from "../../interfaces/examResponse";
import CachedEndpoint from "../../services/cacheService/decorators/cachedEndpoint";
import express from "express";

@Route("exam")
@Tags("Exam")
export class ExamController extends Controller {
    private readonly _repository: ExamRepository;

    constructor(repository?: ExamRepository) {
        super();
        if (repository === undefined) repository = new ExamRepository();
        this._repository = repository;
    }

    @Get("")
    @CachedEndpoint("exam")
    public async getExams(): Promise<ExamResponseI[]> {
        return (await this._repository.getExams()) as ExamResponseI[];
    }
}
