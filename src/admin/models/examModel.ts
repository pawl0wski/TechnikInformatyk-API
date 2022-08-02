import ApiGateway from "../lib/apiGateway/apiGateway";
import ExamRequest from "../../interfaces/examRequest";
import ExamResponse from "../../interfaces/examResponse";
import Model from "./model";

export default class ExamModel extends Model {
    uuid = "";
    name = "";
    description = "";
    icon = "";
    type = "main";

    alreadyInDatabase = false;

    private _apiGateway = ApiGateway.withDefaultApiStore();

    public static fromResponse(examResponse: ExamResponse) {
        return Object.assign(new ExamModel(), examResponse);
    }

    static async getAllModelsFromApi(): Promise<ExamModel[]> {
        const apiGateway = ApiGateway.withDefaultApiStore();
        const response = await apiGateway.getExams();

        const models = [];
        if (response.status == 200) {
            for (const modelResponse of response.data) {
                const exam = ExamModel.fromResponse(modelResponse);
                exam.alreadyInDatabase = true;
                models.push(exam);
            }
        }
        return models;
    }

    private get _examRequest(): ExamRequest {
        return {
            description: this.description,
            icon: this.icon,
            name: this.name,
            type: this.type,
        };
    }

    public async delete() {
        const res = await this._apiGateway.deleteExam(this.uuid);
        if (res.status != 200) throw new Error("Error while deleting exam");
    }

    public async update() {
        const res = await this._apiGateway.updateExam(
            this.uuid,
            this._examRequest
        );
        if (res.status != 200) throw new Error("Error while updating exam");
    }

    public async create() {
        const res = await this._apiGateway.createExam(
            this.uuid,
            this._examRequest
        );
        if (res.status != 200) throw new Error("Error while creating exam");
        this.alreadyInDatabase = true;
    }

    public async createOrUpdateIfAlreadyInDatabase() {
        if (this.alreadyInDatabase) return this.update();
        return this.create();
    }

    public copy(): ExamModel {
        const newExamModel = ExamModel.fromResponse(Object.assign({}, this));
        newExamModel.alreadyInDatabase = this.alreadyInDatabase;
        return newExamModel;
    }
}
