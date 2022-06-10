import { Request, Response } from "express";
import CDN from "../../cdn/cdn";
import { mkdtempSync, rmSync } from "fs";
import * as os from "os";
import path from "path";

async function getImagesSnapshot(req: Request, res: Response) {
    if (!CDN.isCDNEnabled) {
        const tmpDir = mkdtempSync(path.join(os.tmpdir(), "ImageSnapshot"));
        const cdn = new CDN({ cdnPath: tmpDir });
        await cdn.createImages();
        await cdn.createImagesSnapshot();
        res.sendFile(path.join(tmpDir, "imagesSnapshot.tar"), {}, () => {
            rmSync(tmpDir, {
                recursive: true,
            });
        });
    } else {
        const cdn = new CDN({});
        res.redirect(cdn.getUrlToImagesSnapshot());
    }
}

export default getImagesSnapshot;
