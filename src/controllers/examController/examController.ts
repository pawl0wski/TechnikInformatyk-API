import { Get, Route } from "tsoa";
import { Controller } from "@tsoa/runtime";
import ExamRepository from "../../repositories/examRepository/examRepository";
import ExamResponseI from "../../interfaces/examResponse";

@Route("exam")
export class ExamController extends Controller {
    private readonly _repository: ExamRepository;

    constructor(repository?: ExamRepository) {
        super();
        if (repository === undefined) repository = new ExamRepository();
        this._repository = repository;
    }

    @Get("")
    public async getExams(): Promise<ExamResponseI[]> {
        return (await this._repository.getExams()) as ExamResponseI[];
    }
}
