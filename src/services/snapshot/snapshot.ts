import { existsSync, mkdirSync, promises as fs } from "fs";
import path from "path";
import tar from "tar";
import glob from "glob-promise";
import chalk from "chalk";
import Question from "../../database/models/question.model";

interface SnapshotConfiguration {
    snapshotPath?: string;
}

export default class Snapshot {
    private readonly cdnPath?: string;

    constructor(config: SnapshotConfiguration) {
        const { snapshotPath } = config;
        this.cdnPath = snapshotPath;
    }

    public get getSnapshotPath(): string {
        if (this.cdnPath !== undefined) return this.cdnPath;
        return process.env.SNAPSHOT_PATH || "snapshot/";
    }

    public static get isSnapshotEnabled(): boolean {
        return (
            process.env.ENABLE_SNAPSHOT === "true" ||
            process.env.ENABLE_SNAPSHOT === "1"
        );
    }

    createSnapshotFolder() {
        const snapshotPath = this.getSnapshotPath;
        if (!existsSync(snapshotPath)) {
            mkdirSync(snapshotPath);
        }
    }

    getUrlToImage(questionUuid: string): string {
        const snapshotPath = this.getSnapshotPath;
        return `/${snapshotPath}${questionUuid}.jpg`;
    }

    getUrlToImagesSnapshot(): string {
        const cdnPath = this.getSnapshotPath;
        return `/${cdnPath}imagesSnapshot.tar`;
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
        const snapshotPath = this.getSnapshotPath;
        const imageWritePromises: Promise<void>[] = [];
        for (const question of questionsWithImages) {
            const imagePath = path.join(snapshotPath, `${question.uuid}.jpg`);
            imageWritePromises.push(fs.writeFile(imagePath, question.image));
        }
        await Promise.all(imageWritePromises);
    }

    async createImagesSnapshot() {
        const cdnPath = this.getSnapshotPath;
        const jpgFiles = (await glob(path.join(cdnPath, "*.jpg"))).map((e) =>
            path.basename(e)
        );
        await tar.c(
            {
                cwd: cdnPath,
                file: path.join(cdnPath, "imagesSnapshot.tar"),
            },
            jpgFiles
        );
    }
}
