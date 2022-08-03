import { NextFunction, Request, Response } from "express";
import NotFoundError from "../errors/notFoundError";
import AuthenticationError from "../errors/authenticationError";

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
        console.error(err);
        res.status(404).json({
            message: err.message,
        } as ErrorResultI);
    } else if (err instanceof AuthenticationError) {
        console.error(err);
        res.status(401).json({
            message: err.message,
        } as ErrorResultI);
    } else {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error",
        } as ErrorResultI);
    }

    next();
}
