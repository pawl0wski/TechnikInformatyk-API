import ApiGateway from "../lib/apiGateway/apiGateway";
import ExamRequest from "../../interfaces/examRequest";
import ExamResponseI from "../../interfaces/examResponse";

export default class ExamModel {
    uuid = "";
    name = "";
    description = "";
    icon = "";
    type = "main";

    alreadyInDatabase = false;

    private _apiGateway = ApiGateway.withDefaultApiStore();

    public static fromResponse(examResponse: ExamResponseI) {
        const examModel = new ExamModel();
        const { uuid, name, description, icon, type } = examResponse;
        examModel.uuid = uuid;
        examModel.name = name;
        examModel.description = description;
        examModel.icon = icon;
        examModel.type = type;
        return examModel;
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
