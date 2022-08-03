import { Exception } from "tsoa";

export default class AuthenticationError extends Error implements Exception {
    public status = 401;

    constructor(message?: string) {
        super(message);
    }
}
