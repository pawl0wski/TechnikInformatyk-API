import { NextFunction, Request, Response } from "express";
import NotFoundError from "../errors/notFoundError";

export interface ErrorResultI {
    message: string;
}

export default function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof NotFoundError) {
        res.status(404).json({
            message: "Not Found",
        } as ErrorResultI);
    } else {
        res.status(500).json({
            message: "Internal Server Error",
        } as ErrorResultI);
    }
    next();
}
