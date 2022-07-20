import Exam from "../../database/models/exam.model";

export default class ExamRepository {
    async getExams(): Promise<Exam[]> {
        return await Exam.findAll();
    }
}
