import Question from "../../database/models/question.model";
import Exam from "../../database/models/exam.model";
import { AdapterI } from "./interfaces/adapter";

export default class QuestionsAdapter implements AdapterI {
    protected questions: Question[];

    constructor(question: Question[]) {
        this.questions = question;
    }

    protected adaptQuestion(question: Question) {
        const {
            uuid,
            content,
            answerA,
            answerB,
            answerC,
            answerD,
            correctAnswer,
            exams,
            image,
        } = question;

        return {
            uuid,
            content,
            haveImage: image != null,
            answerA,
            answerB,
            answerC,
            answerD,
            correctAnswer,
            examUuids: exams.map((e: Exam) => e.uuid) || [],
        };
    }

    adapt(): {
        [key: string]: string | boolean | string[] | number;
    }[] {
        return this.questions.map((q: Question) => this.adaptQuestion(q));
    }
}
