import { Request, Response } from "express";
import DatabaseService from "../../database/databaseService";
import CDN from "../../cdn/cdn";

async function getImagesSnapshot(req: Request, res: Response) {
    const databaseInstance = DatabaseService.getInstance();
    const cdn = new CDN();
    if (!cdn.isCDNEnabled()) {
    } else {
        res.redirect(cdn.getUrlToImagesSnapshot());
    }
}

export default getImagesSnapshot;
