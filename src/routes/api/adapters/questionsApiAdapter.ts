import Question from "../../../database/models/question.model";
import Exam from "../../../database/models/exam.model";
import ApiAdapter from "./apiAdapter";

export default class QuestionsApiAdapter extends ApiAdapter {
    protected questions: Question[];

    constructor(question: Question[]) {
        super();
        this.questions = question;
    }

    private mapQuestionToApiObject(question: Question) {
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

    getAsApiObject(): {
        [key: string]: string | boolean | string[] | number;
    }[] {
        return this.questions.map((q: Question) =>
            this.mapQuestionToApiObject(q)
        );
    }
}
