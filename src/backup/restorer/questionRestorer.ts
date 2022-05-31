import Restorer from "./restorer";
import Question from "../../database/models/question.model";
import { Model } from "sequelize-typescript";
import ExamQuestion from "../../database/models/examquestion.model";

export default class QuestionRestorer extends Restorer {
    protected buildModel(jsonData: { [p: string]: string }): Model {
        return Question.build(jsonData);
    }

    protected async checkIfExists(primaryKey: string): Promise<boolean> {
        return (await Question.count({ where: { uuid: primaryKey } })) != 0;
    }

    protected getModelInstancePrimaryKey(model: Question): string {
        return model.uuid;
    }

    protected getModelName(): string {
        return Question.name;
    }

    protected async afterSave(jsonData: {
        [p: string]: string;
    }): Promise<void> {
        let questionUuid = jsonData.uuid;
        if (Array.isArray(jsonData)) {
            for (let examUuid of jsonData["exam"]) {
                if (
                    (await ExamQuestion.count({
                        where: { questionUuid, examUuid },
                    })) == 0
                ) {
                    await ExamQuestion.create({ questionUuid, examUuid });
                }
            }
        }
    }
}
