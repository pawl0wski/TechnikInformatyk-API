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
        sendStatus(res, {
            statusCode: 404,
            error: err,
            message: err.message,
        });
    } else if (err instanceof AuthenticationError) {
        sendStatus(res, {
            statusCode: 401,
            error: err,
            message: err.message,
        });
    } else if (err instanceof Error) {
        sendStatus(res, {
            statusCode: 500,
            error: err,
            message: "Internal Server Error",
        });
    }

    next();
}

function sendStatus(
    res: Response,
    statusOptions: { statusCode: number; error: Error; message: string }
) {
    const { statusCode, error, message } = statusOptions;
    console.error(error);
    res.status(statusCode).json({
        message,
    } as ErrorResultI);
}
