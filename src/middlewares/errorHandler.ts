import { NextFunction, Request, Response } from "express";
import NotFoundError from "../errors/notFoundError";
import AuthenticationError from "../errors/authenticationError";
import { ValidationError } from "sequelize";
import { ValidateError } from "@tsoa/runtime";
import { Exception } from "tsoa";

export interface ErrorResultI {
    message: string;
}

export default function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof Error) {
        if (isErrorWhichCanBeSend(err)) {
            sendStatus(res, {
                statusCode: (err as Exception).status,
                error: err,
                message: getMessageForError(err),
            });
        } else {
            sendStatus(res, {
                statusCode: 500,
                error: err,
                message: "Internal Server Error",
            });
        }
    }

    next();
}

function isErrorWhichCanBeSend(err: Error): boolean {
    return "status" in err;
}

function getMessageForError(err: Error): string | object {
    if (err instanceof ValidateError) {
        return err.fields;
    } else {
        return err.message;
    }
}

function sendStatus(
    res: Response,
    statusOptions: {
        statusCode: number;
        error: Error;
        message: string | object;
    }
) {
    const { statusCode, error, message } = statusOptions;
    console.error(error);
    res.status(statusCode).json({
        message,
    } as ErrorResultI);
}
