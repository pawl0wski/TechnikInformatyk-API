/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
    Controller,
    ValidationService,
    FieldErrors,
    ValidateError,
    TsoaRoute,
    HttpStatusCodeLiteral,
    TsoaResponse,
    fetchMiddlewares,
} from "@tsoa/runtime";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DatabaseVersionController } from "./controllers/databaseVersionController/databaseVersionController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ExamController } from "./controllers/examController/examController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PingController } from "./controllers/pingController/pingController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { QuestionController } from "./controllers/questionController/questionController";
import type { RequestHandler } from "express";
import * as express from "express";

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    DatabaseVersionResponseI: {
        dataType: "refObject",
        properties: {
            version: { dataType: "double", required: true },
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    ExamResponseI: {
        dataType: "refObject",
        properties: {
            uuid: { dataType: "string", required: true },
            name: { dataType: "string", required: true },
            description: { dataType: "string", required: true },
            icon: { dataType: "string", required: true },
            type: { dataType: "string", required: true },
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    QuestionResponseI: {
        dataType: "refObject",
        properties: {
            uuid: { dataType: "string", required: true },
            content: { dataType: "string", required: true },
            answerA: { dataType: "string", required: true },
            answerB: { dataType: "string", required: true },
            answerC: { dataType: "string", required: true },
            answerD: { dataType: "string", required: true },
            correctAnswer: { dataType: "double", required: true },
            haveImage: { dataType: "boolean", required: true },
            examUuids: {
                dataType: "array",
                array: { dataType: "string" },
                required: true,
            },
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.get(
        "/database-version",
        ...fetchMiddlewares<RequestHandler>(DatabaseVersionController),
        ...fetchMiddlewares<RequestHandler>(
            DatabaseVersionController.prototype.getDatabaseVersion
        ),

        function DatabaseVersionController_getDatabaseVersion(
            request: any,
            response: any,
            next: any
        ) {
            const args = {};

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new DatabaseVersionController();

                const promise = controller.getDatabaseVersion.apply(
                    controller,
                    validatedArgs as any
                );
                promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        }
    );
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get(
        "/exam",
        ...fetchMiddlewares<RequestHandler>(ExamController),
        ...fetchMiddlewares<RequestHandler>(ExamController.prototype.getExams),

        function ExamController_getExams(
            request: any,
            response: any,
            next: any
        ) {
            const args = {};

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ExamController();

                const promise = controller.getExams.apply(
                    controller,
                    validatedArgs as any
                );
                promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        }
    );
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get(
        "/ping",
        ...fetchMiddlewares<RequestHandler>(PingController),
        ...fetchMiddlewares<RequestHandler>(PingController.prototype.getPing),

        function PingController_getPing(
            request: any,
            response: any,
            next: any
        ) {
            const args = {};

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PingController();

                const promise = controller.getPing.apply(
                    controller,
                    validatedArgs as any
                );
                promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        }
    );
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get(
        "/question",
        ...fetchMiddlewares<RequestHandler>(QuestionController),
        ...fetchMiddlewares<RequestHandler>(
            QuestionController.prototype.getExams
        ),

        function QuestionController_getExams(
            request: any,
            response: any,
            next: any
        ) {
            const args = {};

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new QuestionController();

                const promise = controller.getExams.apply(
                    controller,
                    validatedArgs as any
                );
                promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        }
    );
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get(
        "/question/:uuid/image",
        ...fetchMiddlewares<RequestHandler>(QuestionController),
        ...fetchMiddlewares<RequestHandler>(
            QuestionController.prototype.getQuestionImage
        ),

        function QuestionController_getQuestionImage(
            request: any,
            response: any,
            next: any
        ) {
            const args = {
                uuid: {
                    in: "path",
                    name: "uuid",
                    required: true,
                    dataType: "string",
                },
                req: {
                    in: "request",
                    name: "req",
                    required: true,
                    dataType: "object",
                },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new QuestionController();

                const promise = controller.getQuestionImage.apply(
                    controller,
                    validatedArgs as any
                );
                promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        }
    );
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return (
            "getHeaders" in object &&
            "getStatus" in object &&
            "setStatus" in object
        );
    }

    function promiseHandler(
        controllerObj: any,
        promise: any,
        response: any,
        successStatus: any,
        next: any
    ) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers);
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(
        response: any,
        statusCode?: number,
        data?: any,
        headers: any = {}
    ) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (
            data &&
            typeof data.pipe === "function" &&
            data.readable &&
            typeof data._read === "function"
        ) {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(
        response: any
    ): TsoaResponse<HttpStatusCodeLiteral, unknown> {
        return function (status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case "request":
                    return request;
                case "query":
                    return validationService.ValidateParam(
                        args[key],
                        request.query[name],
                        name,
                        fieldErrors,
                        undefined,
                        { noImplicitAdditionalProperties: "throw-on-extras" }
                    );
                case "path":
                    return validationService.ValidateParam(
                        args[key],
                        request.params[name],
                        name,
                        fieldErrors,
                        undefined,
                        { noImplicitAdditionalProperties: "throw-on-extras" }
                    );
                case "header":
                    return validationService.ValidateParam(
                        args[key],
                        request.header(name),
                        name,
                        fieldErrors,
                        undefined,
                        { noImplicitAdditionalProperties: "throw-on-extras" }
                    );
                case "body":
                    return validationService.ValidateParam(
                        args[key],
                        request.body,
                        name,
                        fieldErrors,
                        undefined,
                        { noImplicitAdditionalProperties: "throw-on-extras" }
                    );
                case "body-prop":
                    return validationService.ValidateParam(
                        args[key],
                        request.body[name],
                        name,
                        fieldErrors,
                        "body.",
                        { noImplicitAdditionalProperties: "throw-on-extras" }
                    );
                case "formData":
                    if (args[key].dataType === "file") {
                        return validationService.ValidateParam(
                            args[key],
                            request.file,
                            name,
                            fieldErrors,
                            undefined,
                            {
                                noImplicitAdditionalProperties:
                                    "throw-on-extras",
                            }
                        );
                    } else if (
                        args[key].dataType === "array" &&
                        args[key].array.dataType === "file"
                    ) {
                        return validationService.ValidateParam(
                            args[key],
                            request.files,
                            name,
                            fieldErrors,
                            undefined,
                            {
                                noImplicitAdditionalProperties:
                                    "throw-on-extras",
                            }
                        );
                    } else {
                        return validationService.ValidateParam(
                            args[key],
                            request.body[name],
                            name,
                            fieldErrors,
                            undefined,
                            {
                                noImplicitAdditionalProperties:
                                    "throw-on-extras",
                            }
                        );
                    }
                case "res":
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, "");
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
