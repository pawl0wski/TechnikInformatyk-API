import GuardValidator from "../guardValidator";
import { useAuthStore } from "../../../stores/authStore";

export default class AuthorizationValidator extends GuardValidator {
    redirectIfNotValid = "/panel/login";
    validate(): boolean {
        const authStore = useAuthStore();
        return authStore.isKeyCorrect ?? false;
    }
}
