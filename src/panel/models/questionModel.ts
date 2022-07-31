import Model from "./model";
import QuestionResponseI from "../../interfaces/questionResponse";
import QuestionRequest from "../../interfaces/questionRequest";

export default class QuestionModel extends Model {
    uuid = "";
    content = "";
    answerA = "";
    answerB = "";
    answerC = "";
    answerD = "";
    correctAnswer = 0;
    haveImage = false;
    examUuids = [];

    static fromResponse(questionResponse: QuestionResponseI): QuestionModel {
        return Object.assign(new QuestionModel(), questionResponse);
    }

    private get _questionRequest(): QuestionRequest {
        return {
            answerA: this.answerA,
            answerB: this.answerB,
            answerC: this.answerC,
            answerD: this.answerD,
            content: this.content,
            correctAnswer: this.correctAnswer,
            examUuids: this.examUuids,
            uuid: this.uuid,
        };
    }

    copy(): Model {
        return QuestionModel.fromResponse({
            ...this._questionRequest,
            haveImage: this.haveImage,
        });
    }

    create(): Promise<void> {
        // TODO: Implement
        return Promise.resolve(undefined);
    }

    createOrUpdateIfAlreadyInDatabase(): Promise<void> {
        // TODO: Implement
        return Promise.resolve(undefined);
    }

    delete(): Promise<void> {
        // TODO: Implement
        return Promise.resolve(undefined);
    }

    update(): Promise<void> {
        // TODO: Implement
        return Promise.resolve(undefined);
    }
}
