import { existsSync, mkdirSync, promises as fs } from "fs";
import path from "path";
import tar from "tar";
import glob from "glob-promise";
import chalk from "chalk";
import Question from "../../database/models/question.model";
import EnvironmentConfig from "../../config/environmentConfig";

interface SnapshotConfiguration {
    snapshotPath?: string;
}

export default class SnapshotService {
    private readonly _snapshotPath: string;

    constructor(config: SnapshotConfiguration) {
        const { snapshotPath } = config;
        this._snapshotPath = snapshotPath ?? EnvironmentConfig.snapshotPath;
    }

    createSnapshotFolder() {
        if (!existsSync(this._snapshotPath)) {
            mkdirSync(this._snapshotPath);
        }
    }

    getUrlToImage(questionUuid: string): string {
        return `/${this._snapshotPath}${questionUuid}.jpg`;
    }

    getUrlToImagesSnapshot(): string {
        return `/${this._snapshotPath}imagesSnapshot.tar`;
    }

    async rebuild(settings: { verbose: boolean } = { verbose: false }) {
        settings.verbose
            ? console.log(chalk.gray("Creating snapshot folder..."))
            : null;
        this.createSnapshotFolder();

        settings.verbose
            ? process.stdout.write("Coping all images to snapshot folder... ")
            : null;
        await this.createImages();
        settings.verbose ? process.stdout.write(chalk.green("OK\n")) : null;

        settings.verbose
            ? process.stdout.write("Rebuilding Snapshot... ")
            : null;
        await this.createImagesSnapshot();
        settings.verbose ? process.stdout.write(chalk.green("OK\n")) : null;
    }

    async createImages() {
        const questionsWithImages = (await Question.findAll()).filter(
            (q: Question) => q.image != null
        );
        const imageWritePromises: Promise<void>[] = [];
        for (const question of questionsWithImages) {
            const imagePath = path.join(
                this._snapshotPath,
                `${question.uuid}.jpg`
            );
            imageWritePromises.push(fs.writeFile(imagePath, question.image));
        }
        await Promise.all(imageWritePromises);
    }

    async createImagesSnapshot() {
        const jpgFiles = (
            await glob(path.join(this._snapshotPath, "*.jpg"))
        ).map((e) => path.basename(e));
        await tar.c(
            {
                cwd: this._snapshotPath,
                file: path.join(this._snapshotPath, "imagesSnapshot.tar"),
            },
            jpgFiles
        );
    }
}
