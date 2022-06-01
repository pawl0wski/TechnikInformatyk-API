import Backup from "./backup";
import QuestionsAdapter from "../../adapters/questionsAdapter";
import Question from "../../database/models/question.model";
import CDN from "../../cdn/cdn";
import { copyFileSync, mkdirSync, mkdtempSync, renameSync, rmSync } from "fs";
import * as os from "os";
import path from "path";
import DatabaseService from "../../database/databaseService";

export default class QuestionBackup extends Backup {
    protected adaptToApiResponse(models: Question[]): { [p: string]: any }[] {
        return new QuestionsAdapter(models).adapt();
    }

    protected async getAllModels(): Promise<Question[]> {
        const databaseService = DatabaseService.getInstance();
        return await databaseService.getAllQuestions();
    }

    protected getModelName(): string {
        return "Question";
    }

    protected async afterBackup(): Promise<void> {
        const cdn = new CDN();

        const tmpDir = mkdtempSync(path.join(os.tmpdir(), "ImagesSnapshot"));
        await cdn.createImages({ cdnPath: tmpDir });
        await cdn.createImagesSnapshot({ cdnPath: tmpDir });

        await copyFileSync(
            path.join(tmpDir, "imagesSnapshot.tar"),
            path.join(this.backupPath, "imagesSnapshot.tar")
        );
        await rmSync(tmpDir, { recursive: true });
    }
}
