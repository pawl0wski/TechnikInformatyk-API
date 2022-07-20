import Question from "../../database/models/question.model";
import Exam from "../../database/models/exam.model";

export default class QuestionRepository {
    async getQuestions(): Promise<Question[]> {
        return Question.findAll({
            include: [Exam],
        });
    }
}
