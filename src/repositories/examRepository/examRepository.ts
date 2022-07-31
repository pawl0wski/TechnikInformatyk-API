import Exam from "../../database/models/exam.model";
import ExamRequest from "../../interfaces/examRequest";
import NotFoundError from "../../errors/notFoundError";

export default class ExamRepository {
    async getExams(): Promise<Exam[]> {
        return await Exam.findAll();
    }

    async updateExam(
        examUuid: string,
        updatedExam: ExamRequest
    ): Promise<Exam> {
        const exam = await Exam.findByPk(examUuid);
        if (exam === null) throw new NotFoundError();
        return await exam.update(updatedExam);
    }

    async createExam(examUuid: string, newExam: ExamRequest): Promise<Exam> {
        return await Exam.create({
            uuid: examUuid,
            ...newExam,
        });
    }
}
