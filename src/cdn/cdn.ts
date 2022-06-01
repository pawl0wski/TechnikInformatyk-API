import Question from "../database/models/question.model";
import { existsSync, mkdirSync, promises as fs } from "fs";
import path from "path";
import tar from "tar";
import glob from "glob-promise";
import chalk from "chalk";

export default class CDN {
    getCDNPath(cdnPath?: string): string {
        if (cdnPath !== undefined) {
            return cdnPath;
        }
        return process.env.CDN_PATH || "cdn/";
    }

    isCDNEnabled(): boolean {
        return (
            process.env.ENABLE_CDN === "true" || process.env.ENABLE_CDN === "1"
        );
    }

    createCDNFolder() {
        const cdnPath = this.getCDNPath();
        if (!existsSync(cdnPath)) {
            mkdirSync(this.getCDNPath());
        }
    }

    async rebuildIfCDNEnabled(
        settings: { verbose: boolean } = { verbose: false }
    ) {
        if (this.isCDNEnabled()) {
            await this.rebuild(settings);
        }
    }

    getUrlToImage(questionUuid: string): string {
        const cdnPath = this.getCDNPath();
        return `/${cdnPath}${questionUuid}.jpg`;
    }

    getUrlToImagesSnapshot(): string {
        const cdnPath = this.getCDNPath();
        return `/${cdnPath}imagesSnapshot.tar`;
    }

    async rebuild(settings: { verbose: boolean } = { verbose: false }) {
        settings.verbose ? console.log(chalk.gray("Rebuilding CDN...")) : null;
        this.createCDNFolder();

        settings.verbose
            ? process.stdout.write("Coping all images to cdn folder... ")
            : null;
        await this.createImages({});
        settings.verbose ? process.stdout.write(chalk.green("OK\n")) : null;

        settings.verbose ? process.stdout.write("Rebuilding CDN... ") : null;
        await this.createImagesSnapshot({});
        settings.verbose ? process.stdout.write(chalk.green("OK\n")) : null;
    }

    async createImages(config: { cdnPath?: string }) {
        const questionsWithImages = (await Question.findAll()).filter(
            (q: Question) => q.image != null
        );
        const cdnPath = this.getCDNPath(config.cdnPath);
        let imageWritePromises: Promise<any>[] = [];
        for (let question of questionsWithImages) {
            let imagePath = path.join(cdnPath, `${question.uuid}.jpg`);
            imageWritePromises.push(fs.writeFile(imagePath, question.image));
        }
        await Promise.all(imageWritePromises);
    }

    async createImagesSnapshot(config: { cdnPath?: string }) {
        const cdnPath = this.getCDNPath(config.cdnPath);
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
