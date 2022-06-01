import { Request, Response } from "express";
import CDN from "../../cdn/cdn";
import { mkdtempSync, rmSync } from "fs";
import * as os from "os";
import path from "path";

async function getImagesSnapshot(req: Request, res: Response) {
    const cdn = new CDN();
    if (!cdn.isCDNEnabled()) {
        const tmpDir = mkdtempSync(path.join(os.tmpdir(), "ImageSnapshot"));
        await cdn.createImages({ cdnPath: tmpDir });
        await cdn.createImagesSnapshot({ cdnPath: tmpDir });
        res.sendFile(path.join(tmpDir, "imagesSnapshot.tar"), {}, (err) => {
            rmSync(tmpDir, {
                recursive: true,
            });
        });
    } else {
        res.redirect(cdn.getUrlToImagesSnapshot());
    }
}

export default getImagesSnapshot;
