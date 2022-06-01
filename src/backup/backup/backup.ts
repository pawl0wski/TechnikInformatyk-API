import { Model } from "sequelize-typescript";
import { openSync, writeSync } from "fs";
import path from "path";

export default abstract class Backup {
    protected backupPath;

    constructor(backupPath: string) {
        this.backupPath = backupPath;
    }

    protected abstract getAllModels(): Promise<Model[]>;
    protected abstract adaptToApiResponse(models: Model[]): {
        [key: string]: any;
    }[];
    protected abstract getModelName(): string;
    protected async afterBackup(): Promise<void> {}

    async backup(): Promise<Model[]> {
        const models = await this.getAllModels();
        const apiResponse = this.adaptToApiResponse(models);
        const modelName = this.getModelName();
        const f = openSync(
            path.join(this.backupPath, `${modelName}.json`),
            "w"
        );
        writeSync(f, JSON.stringify(apiResponse));

        await this.afterBackup();

        return models;
    }
}
