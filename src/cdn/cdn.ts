import Question from "../database/models/question.model";
import { existsSync, mkdirSync, promises as fs } from "fs";
import path from "path";
import tar from "tar";
import glob from "glob-promise";
import chalk from "chalk";

interface CDNConfig {
    cdnPath?: string;
}

export default class CDN {
    private readonly cdnPath?: string;

    constructor(config: CDNConfig) {
        const { cdnPath } = config;
        this.cdnPath = cdnPath;
    }

    public get getCDNPath(): string {
        if (this.cdnPath !== undefined) return this.cdnPath;
        return process.env.CDN_PATH || "cdn/";
    }

    public static get isCDNEnabled(): boolean {
        return (
            process.env.ENABLE_CDN === "true" || process.env.ENABLE_CDN === "1"
        );
    }

    createCDNFolder() {
        const cdnPath = this.getCDNPath;
        if (!existsSync(cdnPath)) {
            mkdirSync(cdnPath);
        }
    }

    getUrlToImage(questionUuid: string): string {
        const cdnPath = this.getCDNPath;
        return `/${cdnPath}${questionUuid}.jpg`;
    }

    getUrlToImagesSnapshot(): string {
        const cdnPath = this.getCDNPath;
        return `/${cdnPath}imagesSnapshot.tar`;
    }

    async rebuild(settings: { verbose: boolean } = { verbose: false }) {
        settings.verbose ? console.log(chalk.gray("Rebuilding CDN...")) : null;
        this.createCDNFolder();

        settings.verbose
            ? process.stdout.write("Coping all images to cdn folder... ")
            : null;
        await this.createImages();
        settings.verbose ? process.stdout.write(chalk.green("OK\n")) : null;

        settings.verbose ? process.stdout.write("Rebuilding CDN... ") : null;
        await this.createImagesSnapshot();
        settings.verbose ? process.stdout.write(chalk.green("OK\n")) : null;
    }

    async createImages() {
        const questionsWithImages = (await Question.findAll()).filter(
            (q: Question) => q.image != null
        );
        const cdnPath = this.getCDNPath;
        let imageWritePromises: Promise<any>[] = [];
        for (let question of questionsWithImages) {
            let imagePath = path.join(cdnPath, `${question.uuid}.jpg`);
            imageWritePromises.push(fs.writeFile(imagePath, question.image));
        }
        await Promise.all(imageWritePromises);
    }

    async createImagesSnapshot() {
        const cdnPath = this.getCDNPath;
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
