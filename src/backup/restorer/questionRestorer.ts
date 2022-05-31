import Restorer from "./restorer";
import Question from "../../database/models/question.model";
import { Model } from "sequelize-typescript";
import ExamQuestion from "../../database/models/examquestion.model";
import path from "path";
import tar from "tar";
import * as fs from "fs";
import * as os from "os";
import { existsSync, readFileSync, rmdirSync, rmSync } from "fs";
import chalk from "chalk";

export default class QuestionRestorer extends Restorer {
    protected imagesSnapshotFilesDirectory: string | undefined;

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

    protected async restoreQuestionExamRelationship(jsonData: {
        [p: string]: string;
    }) {
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

    protected async restoreImageFromImagesSnapshot(jsonData: {
        [p: string]: string;
    }) {
        if (this.imagesSnapshotFilesDirectory) {
            const uuid = jsonData.uuid;
            const imagePath = path.join(
                this.imagesSnapshotFilesDirectory,
                uuid + ".jpeg"
            );
            if (existsSync(imagePath)) {
                let question: Question | null = await Question.findOne({
                    where: { uuid },
                });
                if (question == null) {
                    console.log(
                        chalk.red(
                            `Can't import image for question ${uuid}. Question does not exists.`
                        )
                    );
                } else {
                    question.image = readFileSync(imagePath);
                    await question.save();
                }
            }
        }
    }

    protected async afterSave(jsonData: {
        [p: string]: string;
    }): Promise<void> {
        await this.restoreQuestionExamRelationship(jsonData);
        await this.restoreImageFromImagesSnapshot(jsonData);
    }

    protected async beforeRestoring(): Promise<void> {
        this.imagesSnapshotFilesDirectory = fs.mkdtempSync(
            path.join(os.tmpdir(), "imagesSnapshot")
        );
        const imagesSnapshotPath = path.join(
            this.backupPath,
            "imagesSnapshot.tar"
        );
        await tar.x({
            file: imagesSnapshotPath,
            cwd: this.imagesSnapshotFilesDirectory,
        });
    }

    protected async afterRestoring() {
        if (this.imagesSnapshotFilesDirectory) {
            rmSync(this.imagesSnapshotFilesDirectory, {
                recursive: true,
            });
        }
    }
}
