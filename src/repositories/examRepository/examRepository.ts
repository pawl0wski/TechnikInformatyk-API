import Exam from "../../database/models/exam.model";
import ExamRequest from "../../interfaces/examRequest";
import NotFoundError from "../../errors/notFoundError";

export default class ExamRepository {
    async getExams(): Promise<Exam[]> {
        return await Exam.findAll();
    }

    async createExam(examUuid: string, newExam: ExamRequest): Promise<Exam> {
        return await Exam.create({
            uuid: examUuid,
            ...newExam,
        });
    }

    async updateExam(
        examUuid: string,
        updatedExam: ExamRequest
    ): Promise<Exam> {
        const exam = await this.getExam(examUuid);
        return await exam.update(updatedExam);
    }

    async deleteExam(examUuid: string): Promise<Exam> {
        const exam = await this.getExam(examUuid);
        await exam.destroy();
        return exam;
    }

    async examUuidsToExam(examUuids: string[]): Promise<Exam[]> {
        const exams: Exam[] = [];
        for (const examUuid of examUuids) {
            exams.push(await this.getExam(examUuid));
        }
        return exams;
    }

    async getExam(examUuid: string): Promise<Exam> {
        const exam = await Exam.findByPk(examUuid);
        if (exam === null) throw new NotFoundError();
        return exam;
    }
}
