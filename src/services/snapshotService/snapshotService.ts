import { existsSync, mkdirSync, promises as fs } from "fs";
import path from "path";
import tar from "tar";
import glob from "glob-promise";
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

    async rebuild() {
        this.createSnapshotFolder();
        await this.createImages();
        await this.createImagesSnapshot();
    }

    async createImages(outputPath?: string) {
        outputPath ??= this._snapshotPath;
        const questionsWithImages = (await Question.findAll()).filter(
            (q: Question) => q.image != null
        );
        const imageWritePromises: Promise<void>[] = [];
        for (const question of questionsWithImages) {
            const imagePath = path.join(outputPath, `${question.uuid}.jpg`);
            imageWritePromises.push(fs.writeFile(imagePath, question.image));
        }
        await Promise.all(imageWritePromises);
    }

    async createImagesSnapshot(outputPath?: string) {
        outputPath ??= this._snapshotPath;

        const jpgFiles = (await glob(path.join(outputPath, "*.jpg"))).map((e) =>
            path.basename(e)
        );
        await tar.c(
            {
                cwd: outputPath,
                file: path.join(outputPath, "imagesSnapshot.tar"),
            },
            jpgFiles
        );
    }
}
