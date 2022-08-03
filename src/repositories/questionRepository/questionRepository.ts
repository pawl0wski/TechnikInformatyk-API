import Question from "../../database/models/question.model";
import Exam from "../../database/models/exam.model";
import NotFoundError from "../../errors/notFoundError";
import QuestionRequest from "../../interfaces/questionRequest";
import ExamRepository from "../examRepository/examRepository";

export default class QuestionRepository {
    private _examRepository: ExamRepository;

    constructor(examRepository?: ExamRepository) {
        if (examRepository === undefined) examRepository = new ExamRepository();
        this._examRepository = examRepository;
    }

    async getQuestions(): Promise<Question[]> {
        return Question.findAll({
            include: [Exam],
        });
    }

    async updateQuestion(
        questionUuid: string,
        newQuestionContent: QuestionRequest
    ): Promise<Question> {
        const question = await this.getQuestion(questionUuid);
        const { examUuids } = newQuestionContent;
        const exams = await this._examRepository.examUuidsToExam(examUuids);
        return await question.update({
            ...newQuestionContent,
            exams: exams,
        });
    }

    async deleteQuestion(questionUuid: string): Promise<Question> {
        const question = await this.getQuestion(questionUuid);
        await question.destroy();
        return question;
    }

    async getQuestion(questionUuid: string): Promise<Question> {
        const question = await Question.findByPk(questionUuid, {
            include: [Exam],
        });
        if (question === null) throw new NotFoundError();
        return question;
    }

    async getImageForQuestion(uuid: string): Promise<Uint8Array | null> {
        const question = await Question.findByPk(uuid);
        if (question !== null) return question.image;
        return null;
    }
}
