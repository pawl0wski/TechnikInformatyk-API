import { Request, Response } from "express";
import Snapshot from "../../snapshot/snapshot";
import { mkdtempSync, rmSync } from "fs";
import * as os from "os";
import path from "path";

async function getImagesSnapshot(req: Request, res: Response) {
    if (!Snapshot.isSnapshotEnabled) {
        const tmpDir = mkdtempSync(path.join(os.tmpdir(), "ImageSnapshot"));
        const cdn = new Snapshot({ snapshotPath: tmpDir });
        await cdn.createImages();
        await cdn.createImagesSnapshot();
        res.sendFile(path.join(tmpDir, "imagesSnapshot.tar"), {}, () => {
            rmSync(tmpDir, {
                recursive: true,
            });
        });
    } else {
        const cdn = new Snapshot({});
        res.redirect(cdn.getUrlToImagesSnapshot());
    }
}

export default getImagesSnapshot;
