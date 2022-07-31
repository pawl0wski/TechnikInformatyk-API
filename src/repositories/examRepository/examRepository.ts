import Exam from "../../database/models/exam.model";
import ExamRequest from "../../interfaces/examRequest";
import NotFoundError from "../../errors/notFoundError";

export default class ExamRepository {
    async getExams(): Promise<Exam[]> {
        return await Exam.findAll();
    }

    async _getExamByUUIDOrThrowNotFoundError(examUuid: string): Promise<Exam> {
        const exam = await Exam.findByPk(examUuid);
        if (exam === null) throw new NotFoundError();
        return exam;
    }

    async updateExam(
        examUuid: string,
        updatedExam: ExamRequest
    ): Promise<Exam> {
        const exam = await this._getExamByUUIDOrThrowNotFoundError(examUuid);
        return await exam.update(updatedExam);
    }

    async createExam(examUuid: string, newExam: ExamRequest): Promise<Exam> {
        return await Exam.create({
            uuid: examUuid,
            ...newExam,
        });
    }

    async deleteExam(examUuid: string): Promise<Exam> {
        const exam = await this._getExamByUUIDOrThrowNotFoundError(examUuid);
        await exam.destroy();
        return exam;
    }
}
