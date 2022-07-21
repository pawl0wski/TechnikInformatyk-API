import { Get, Route, Tags, Request } from "tsoa";
import { Controller } from "@tsoa/runtime";
import express from "express";
import EnvironmentConfig from "../../config/environmentConfig";
import SnapshotService from "../../services/snapshotService/snapshotService";
import * as os from "os";
import { mkdtempSync, rmSync } from "fs";
import path from "path";
import * as fs from "fs";

@Route("images-snapshot")
@Tags("Images Snapshot")
export class ImagesSnapshotController extends Controller {
    @Get("")
    public async getDatabaseVersion(@Request() req: express.Request) {
        const res = req.res;
        if (res === undefined) return "Not found";
        const snapshotService = new SnapshotService({});
        if (EnvironmentConfig.snapshotEnabled) {
            res.redirect(snapshotService.getUrlToImagesSnapshot());
        } else {
            const tmpDir = mkdtempSync(path.join(os.tmpdir(), "ImageSnapshot"));
            await snapshotService.createImages(tmpDir);
            await snapshotService.createImagesSnapshot(tmpDir);
            const imagesSnapshotData = fs.readFileSync(
                path.join(tmpDir, "imagesSnapshot.tar")
            );
            res.type("tar");
            res.send(imagesSnapshotData);
            rmSync(tmpDir, {
                recursive: true,
            });
        }
    }
}
