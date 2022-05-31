import { existsSync, readFileSync } from "fs";
import Exam from "../database/models/exam.model";
import chalk from "chalk";
import { Model } from "sequelize-typescript";
import Question from "../database/models/question.model";
import path from "path";
import ExamQuestion from "../database/models/examquestion.model";

export default class Restorer {
    private readonly models: typeof Model[] = [Exam, Question];

    async restoreAll(
        directory: string,
        config: { verbose: boolean } = { verbose: true }
    ) {
        for (const model of this.models) {
            config.verbose ? console.log(`Restoring ${model.name}...`) : null;
            const fileToRestore = path.join(directory, model.name + ".json");
            if (!existsSync(fileToRestore)) {
                config.verbose
                    ? console.log(
                          chalk.red(`File ${fileToRestore} not exists!`)
                      )
                    : null;
                continue;
            }
            let savedObjects = await this.restore(model, fileToRestore);
            config.verbose
                ? console.log(chalk.green(`Restored ${savedObjects.length}`))
                : null;
        }
        console.log("Wait a second...");
    }

    private async restoreQuestionToExamsRelationships(
        question: Question,
        examUuids: string[]
    ) {
        for (let uuid of examUuids) {
            let exam: Exam | null = await Exam.findOne({
                where: { uuid },
            });
            if (exam != null) {
                await ExamQuestion.create({
                    examUuid: exam.uuid,
                    questionUuid: question.uuid,
                });
            }
        }
    }

    private async restore(
        model: typeof Model,
        filePath: string
    ): Promise<Exam[]> {
        const data = readFileSync(filePath).toString();
        const dataJson: { [key: string]: string }[] = JSON.parse(data);
        //@ts-ignore
        const savePromises: Promise<model>[] = [];
        for (const e of dataJson) {
            //@ts-ignore
            const object: model = model.build(e);
            //@ts-ignore
            if ((await model.count({ where: { uuid: object.uuid } })) != 0) {
                console.log(
                    chalk.red(
                        `${model.name} with uuid ${object.uuid} already exists. Ignoring...`
                    )
                );
            } else {
                savePromises.push(
                    (async () => {
                        await object.save();
                        if (model == Question && Array.isArray(e.exam)) {
                            await this.restoreQuestionToExamsRelationships(
                                object as Question,
                                e.exam
                            );
                        }
                    })()
                );
            }
        }
        return Promise.all(savePromises);
    }
}
