import Backup from "./backup";
import QuestionsAdapter from "../../api/adapters/questionsAdapter";
import Question from "../../database/models/question.model";
import Snapshot from "../../snapshot/snapshot";
import { copyFileSync, mkdtempSync, rmSync } from "fs";
import * as os from "os";
import path from "path";
import Exam from "../../database/models/exam.model";

export default class QuestionBackup extends Backup {
    protected adaptToApiResponse(models: Question[]): { [p: string]: any }[] {
        return new QuestionsAdapter(models).adapt();
    }

    protected async getAllModels(): Promise<Question[]> {
        return await Question.findAll({ include: Exam });
    }

    protected getModelName(): string {
        return "Question";
    }

    protected async afterBackup(): Promise<void> {
        const tmpDir = mkdtempSync(path.join(os.tmpdir(), "ImagesSnapshot"));
        const cdn = new Snapshot({ snapshotPath: tmpDir });
        await cdn.createImages();
        await cdn.createImagesSnapshot();

        await copyFileSync(
            path.join(tmpDir, "imagesSnapshot.tar"),
            path.join(this.backupPath, "imagesSnapshot.tar")
        );
        await rmSync(tmpDir, { recursive: true });
    }
}
