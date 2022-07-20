import { Get, Route, Tags } from "tsoa";
import { Controller } from "@tsoa/runtime";
import QuestionRepository from "../../repositories/questionRepository/questionRepository";
import QuestionResponseI from "../../interfaces/questionResponse";

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
            } = question;
            return {
                uuid,
                content,
                answerA,
                answerB,
                answerC,
                answerD,
                correctAnswer,
                examUuids: exams.map((exam) => exam.uuid),
            };
        }) as QuestionResponseI[];
    }
}
