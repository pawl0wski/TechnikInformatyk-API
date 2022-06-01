import Question from "../../database/models/question.model";
import Exam from "../../database/models/exam.model";
import { AdapterI } from "./interfaces/adapter";

export interface AdaptedQuestion {
    uuid: string;
    content: string;
    haveImage: boolean;
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
    correctAnswer: number;
    examUuids: string[];
}

export default class QuestionsAdapter implements AdapterI {
    protected questions: Question[];

    constructor(question: Question[]) {
        this.questions = question;
    }

    protected adaptQuestion(question: Question): AdaptedQuestion {
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

    adapt(): AdaptedQuestion[] {
        return this.questions.map((q: Question) => this.adaptQuestion(q));
    }
}
