import { Body, Get, Path, Put, Route, Security, Tags } from "tsoa";
import { Controller } from "@tsoa/runtime";
import ExamRepository from "../../repositories/examRepository/examRepository";
import ExamResponseI from "../../interfaces/examResponse";
import CachedEndpoint from "../../services/cacheService/decorators/cachedEndpoint";
import ExamRequest from "../../interfaces/examRequest";

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
    @Security("api_key", ["client"])
    @CachedEndpoint("exam")
    public async getExams(): Promise<ExamResponseI[]> {
        return (await this._repository.getExams()) as ExamResponseI[];
    }

    @Put("{uuid}")
    @Security("api_key", ["admin"])
    public async putExam(
        @Path("uuid") examUuid: string,
        @Body() updatedExam: ExamRequest
    ): Promise<ExamResponseI> {
        return (await this._repository.updateExam(
            examUuid,
            updatedExam
        )) as ExamResponseI;
    }
}
