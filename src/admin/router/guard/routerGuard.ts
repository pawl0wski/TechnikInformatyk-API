import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import type GuardValidator from "./guardValidator";
import type PageOptions from "./pageOptions";
import { isValidPageOptions } from "./pageOptions";

export default class RouterGuard {
    public handleRouting(
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext
    ) {
        const pageMeta = to.meta.pageOptions;
        if (isValidPageOptions(pageMeta)) {
            const pageOptions: PageOptions = pageMeta;
            for (const validator of pageOptions.guardValidators) {
                const validationStatus = this.handleValidator(
                    to,
                    validator,
                    next
                );
                if (!validationStatus) return;
            }
        }
        next();
    }

    private handleValidator(
        to: RouteLocationNormalized,
        validator: GuardValidator,
        next: NavigationGuardNext
    ): boolean {
        const validatorResponse = validator.validate(to);
        if (!validatorResponse) next({ path: validator.redirectIfNotValid });
        return validatorResponse;
    }
}
