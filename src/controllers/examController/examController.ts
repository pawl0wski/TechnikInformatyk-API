import {
    Body,
    Delete,
    Get,
    Path,
    Post,
    Put,
    Route,
    Security,
    Tags,
} from "tsoa";
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
        @Body() examRequest: ExamRequest
    ): Promise<ExamResponseI> {
        return (await this._repository.updateExam(
            examUuid,
            examRequest
        )) as ExamResponseI;
    }

    @Post("{uuid}")
    @Security("api_key", ["admin"])
    public async postExam(
        @Path("uuid") examUuid: string,
        @Body() examRequest: ExamRequest
    ): Promise<ExamResponseI> {
        return (await this._repository.createExam(
            examUuid,
            examRequest
        )) as ExamResponseI;
    }

    @Delete("{uuid}")
    @Security("api_key", ["admin"])
    public async deleteExam(
        @Path("uuid") examUuid: string
    ): Promise<ExamResponseI> {
        return (await this._repository.deleteExam(examUuid)) as ExamResponseI;
    }
}
