import Question from "../../../database/models/question.model";
import QuestionResponse from "../../../interfaces/questionResponse";

export class QuestionToResponse {
    private readonly _question: Question;

    constructor(question: Question) {
        this._question = question;
    }

    toResponse(): QuestionResponse {
        let response = this._createResponseWithDefaultValues();
        response = this._copySimilarValuesFromQuestionModel(response);
        response = this._setExamUuids(response);
        response = this._setHaveImage(response);
        return response;
    }

    private _createResponseWithDefaultValues(): QuestionResponse {
        return {
            uuid: "",
            answerA: "",
            answerB: "",
            answerC: "",
            answerD: "",
            content: "",
            correctAnswer: 0,
            examUuids: [],
            haveImage: false,
        };
    }

    private _copySimilarValuesFromQuestionModel(
        response: QuestionResponse
    ): QuestionResponse {
        const {
            answerA,
            answerB,
            answerC,
            answerD,
            content,
            correctAnswer,
            uuid,
        } = this._question;
        response.uuid = uuid;
        response.answerA = answerA;
        response.answerB = answerB;
        response.answerC = answerC;
        response.answerD = answerD;
        response.content = content;
        response.correctAnswer = correctAnswer;
        return response;
    }

    private _setExamUuids(response: QuestionResponse): QuestionResponse {
        const examUuids = [];
        for (const exam of this._question.exams ?? []) {
            examUuids.push(exam.uuid);
        }
        response.examUuids = examUuids;
        return response;
    }

    private _setHaveImage(response: QuestionResponse): QuestionResponse {
        response.haveImage = this._question.image != null;
        return response;
    }
}
