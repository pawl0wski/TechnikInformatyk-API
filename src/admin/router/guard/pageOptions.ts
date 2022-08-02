import type GuardValidator from "./guardValidator";

export default interface PageOptions {
    guardValidators: GuardValidator[];
}

export function isValidPageOptions(object: any): object is PageOptions {
    if (object === undefined) return false;
    return "guardValidators" in object;
}
