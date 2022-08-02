import Model from "./model";
import QuestionResponse from "../../interfaces/questionResponse";
import QuestionRequest from "../../interfaces/questionRequest";
import ApiGateway from "../lib/apiGateway/apiGateway";

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
    private _apiGateway = ApiGateway.withDefaultApiStore();

    static fromResponse(questionResponse: QuestionResponse): QuestionModel {
        return Object.assign(new QuestionModel(), questionResponse);
    }

    static async getAllModelsFromApi(): Promise<QuestionModel[]> {
        const apiGateway = ApiGateway.withDefaultApiStore();
        const response = await apiGateway.getQuestions();

        const models = [];
        if (response.status == 200) {
            for (const modelResponse of response.data) {
                const question = QuestionModel.fromResponse(modelResponse);
                question.alreadyInDatabase = true;
                models.push(question);
            }
        }
        return models;
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

    async getImageInBase64(): Promise<string> {
        const imageResponse = await this._apiGateway.getQuestionImage(
            this.uuid
        );
        const imageBlob = new Blob([imageResponse.data]);
        return await this._convertImageBlobToImageBase64(imageBlob);
    }

    async _convertImageBlobToImageBase64(imageBlob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onload = () => {
                let result = reader.result;
                if (typeof result == "string") {
                    result = result.replace(
                        "application/octet-stream",
                        "image/jpeg"
                    );
                    resolve(result);
                }
                resolve("");
            };
            reader.onerror = (error) => reject(error);
        });
    }
}
