import { readFileSync } from "fs";
import chalk from "chalk";
import { Model } from "sequelize-typescript";

export default abstract class Restorer {
    protected abstract buildModel(jsonData: { [key: string]: string }): Model;
    protected abstract getModelInstancePrimaryKey(model: Model): string;
    protected abstract checkIfExists(primaryKey: string): Promise<boolean>;
    protected abstract getModelName(): string;
    protected abstract afterSave(jsonData: {
        [key: string]: string;
    }): Promise<void>;
    protected ifExist(object: Model) {
        console.log(
            chalk.red(
                `${this.getModelName()} with key ${this.getModelInstancePrimaryKey(
                    object
                )} already exists. Ignoring...`
            )
        );
    }

    async restore(filePath: string) {
        const data = readFileSync(filePath).toString();
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
        return Promise.all(savePromises);
    }
}
