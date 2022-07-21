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

export default class Snapshot {
    private readonly cdnPath?: string;

    constructor(config: SnapshotConfiguration) {
        const { snapshotPath } = config;
        this.cdnPath = snapshotPath;
    }

    createSnapshotFolder() {
        const snapshotPath = EnvironmentConfig.snapshotPath;
        if (!existsSync(snapshotPath)) {
            mkdirSync(snapshotPath);
        }
    }

    getUrlToImage(questionUuid: string): string {
        const snapshotPath = EnvironmentConfig.snapshotPath;
        return `/${snapshotPath}${questionUuid}.jpg`;
    }

    getUrlToImagesSnapshot(): string {
        const snapshotPath = EnvironmentConfig.snapshotPath;
        return `/${snapshotPath}imagesSnapshot.tar`;
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
        const snapshotPath = EnvironmentConfig.snapshotPath;
        const imageWritePromises: Promise<void>[] = [];
        for (const question of questionsWithImages) {
            const imagePath = path.join(snapshotPath, `${question.uuid}.jpg`);
            imageWritePromises.push(fs.writeFile(imagePath, question.image));
        }
        await Promise.all(imageWritePromises);
    }

    async createImagesSnapshot() {
        const snapshotPath = EnvironmentConfig.snapshotPath;
        const jpgFiles = (await glob(path.join(snapshotPath, "*.jpg"))).map(
            (e) => path.basename(e)
        );
        await tar.c(
            {
                cwd: snapshotPath,
                file: path.join(snapshotPath, "imagesSnapshot.tar"),
            },
            jpgFiles
        );
    }
}
