import Restorer from "./restorer";
import Exam from "../../database/models/exam.model";
import { Model } from "sequelize-typescript";

export default class ExamRestorer extends Restorer {
    protected buildModel(jsonData: { [p: string]: string }): Model {
        return Exam.build(jsonData);
    }

    protected async checkIfExists(primaryKey: string): Promise<boolean> {
        return (await Exam.count({ where: { uuid: primaryKey } })) != 0;
    }

    protected getModelInstancePrimaryKey(model: Exam): string {
        return model.uuid;
    }

    protected getModelName(): string {
        return Exam.name;
    }

    protected afterSave(jsonData: { [p: string]: string }): Promise<void> {
        return Promise.resolve(undefined);
    }
}
