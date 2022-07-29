import type { RouteLocationNormalized } from "vue-router";

export default abstract class GuardValidator {
    redirectIfNotValid = "/";
    abstract validate(to: RouteLocationNormalized): boolean;
}
