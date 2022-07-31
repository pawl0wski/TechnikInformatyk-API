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
import ExamResponse from "../../interfaces/examResponse";
import ExamRequest from "../../interfaces/examRequest";
import useCache from "../../services/cacheService/functions/useCache";

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
    public async getExams(): Promise<ExamResponse[]> {
        return (await useCache("exam", async () => {
            return (await this._repository.getExams()) as ExamResponse[];
        })) as ExamResponse[];
    }

    @Put("{uuid}")
    @Security("api_key", ["admin"])
    public async putExam(
        @Path("uuid") examUuid: string,
        @Body() examRequest: ExamRequest
    ): Promise<ExamResponse> {
        return (await this._repository.updateExam(
            examUuid,
            examRequest
        )) as ExamResponse;
    }

    @Post("{uuid}")
    @Security("api_key", ["admin"])
    public async postExam(
        @Path("uuid") examUuid: string,
        @Body() examRequest: ExamRequest
    ): Promise<ExamResponse> {
        return (await this._repository.createExam(
            examUuid,
            examRequest
        )) as ExamResponse;
    }

    @Delete("{uuid}")
    @Security("api_key", ["admin"])
    public async deleteExam(
        @Path("uuid") examUuid: string
    ): Promise<ExamResponse> {
        return (await this._repository.deleteExam(examUuid)) as ExamResponse;
    }
}
