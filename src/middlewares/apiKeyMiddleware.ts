import { NextFunction, Request, Response } from "express";
import Database from "../database/database";

function sendAccessDeniedResponse(res: Response, reason?: string) {
    res.status(403).json({ error: reason ?? "Access Denied" });
}

function apiKeyMiddleware(req: Request, res: Response, next: NextFunction) {
    const database = Database.getInstance();
    const apiKeyHeader = req.headers["api-key"];
    if (apiKeyHeader === undefined) {
        sendAccessDeniedResponse(res, "Provide API key");
        return;
    }

    const privilege = database.getApiKeyPrivilege(apiKeyHeader as string);
    if (privilege === null) {
        sendAccessDeniedResponse(res);
        return;
    }
    next();
}

export default apiKeyMiddleware;
