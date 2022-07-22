import express from "express";
import AuthenticationError from "../../../errors/authenticationError";
import AuthenticationService from "../authenticationService";

export async function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === "api_key") {
        const service = new AuthenticationService();
        const key = request.headers["authorization"];
        if (key && key.length == 64) {
            for (const permission of scopes ?? []) {
                if (
                    !(await service.checkIfKeyHavePermission(key, permission))
                ) {
                    throw new AuthenticationError(
                        "The key has no permissions to access this content."
                    );
                }
            }
            return;
        }
        throw new AuthenticationError(
            "The key, or the absence of a key, prevents you from accessing the content."
        );
    }
}
