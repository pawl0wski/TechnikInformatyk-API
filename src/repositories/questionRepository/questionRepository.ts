import Question from "../../database/models/question.model";
import Exam from "../../database/models/exam.model";

export default class QuestionRepository {
    async getQuestions(): Promise<Question[]> {
        return Question.findAll({
            include: [Exam],
        });
    }

    async getImageForQuestion(uuid: string): Promise<Uint8Array | null> {
        const question = await Question.findByPk(uuid);
        if (question !== null) return question.image;
        return null;
    }
}
