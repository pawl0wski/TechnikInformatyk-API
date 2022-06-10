import { readFileSync } from "fs";
import chalk from "chalk";
import { Model } from "sequelize-typescript";
import path from "path";

export default abstract class Restore {
    protected backupPath: string;

    constructor(backupPath: string) {
        this.backupPath = backupPath;
    }

    protected abstract buildModel(jsonData: { [key: string]: string }): Model;
    protected abstract getModelInstancePrimaryKey(model: Model): string;
    protected abstract checkIfExists(primaryKey: string): Promise<boolean>;
    protected abstract getModelName(): string;

    protected async beforeRestoring(): Promise<void> {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected async afterSave(jsonData: {
        [key: string]: string;
    }): Promise<void> {}
    protected async afterRestoring(): Promise<void> {}
    protected ifExist(object: Model) {
        console.log(
            chalk.red(
                `${this.getModelName()} with key ${this.getModelInstancePrimaryKey(
                    object
                )} already exists. Ignoring...`
            )
        );
    }

    async restore() {
        await this.beforeRestoring();
        const backupJsonPath = path.join(
            this.backupPath,
            this.getModelName() + ".json"
        );
        const data = readFileSync(backupJsonPath).toString();
        const dataJson: { [key: string]: string }[] = JSON.parse(data);
        const savePromises: Promise<any>[] = [];
        for (const e of dataJson) {
            const object = this.buildModel(e);
            if (
                await this.checkIfExists(
                    this.getModelInstancePrimaryKey(object)
                )
            ) {
                this.ifExist(object);
            } else {
                savePromises.push(
                    (async () => {
                        await object.save();
                        await this.afterSave(e);
                    })()
                );
            }
        }
        await this.afterRestoring();
        return Promise.all(savePromises);
    }
}
