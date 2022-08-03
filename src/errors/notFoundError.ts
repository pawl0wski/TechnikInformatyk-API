import { Exception } from "tsoa";

export default class NotFoundError extends Error implements Exception {
    public status = 404;

    constructor(message = "Not Found") {
        super(message);
    }
}
