import { defineStore } from "pinia";
import ApiKeyResponse from "../../interfaces/apiKeyResponse";
import ApiGateway from "../lib/apiGateway/apiGateway";

interface AuthState {
    apiKey: string;
    permission: string;
    correct: boolean | null;
}

export const useAuthStore = defineStore({
    id: "auth",
    state: (): AuthState => {
        const savedAuthState = localStorage.getItem("AuthState");

        return savedAuthState == null
            ? {
                  apiKey: "",
                  permission: "",
                  correct: null,
              }
            : (JSON.parse(savedAuthState) as AuthState);
    },
    actions: {
        setApiKey(apiKey: string) {
            this.apiKey = apiKey;
        },
        async checkIfApiKeyIsCorrect(): Promise<boolean> {
            const apiResponse =
                await ApiGateway.withDefaultApiStore().getApiKeyInfo(
                    this.apiKey
                );

            this.correct = !(
                apiResponse.status === 404 || apiResponse.status === 401
            );

            return this.isKeyCorrect;
        },
        async getApiKeyPermission(): Promise<string> {
            const apiResponse =
                await ApiGateway.withDefaultApiStore().getApiKeyInfo(
                    this.apiKey
                );

            if (apiResponse.status === 200) {
                this.permission = (
                    apiResponse.data as ApiKeyResponse
                ).permission;
            }

            return this.permission;
        },
        async logOut() {
            this.correct = false;
        },
        save() {
            localStorage.setItem("AuthState", JSON.stringify(this.$state));
        },
    },
    getters: {
        httpHeaders: (state): { Authorization: string } => {
            return { Authorization: state.apiKey };
        },
        isKeyCorrect: (state): boolean => {
            return state.correct ?? false;
        },
    },
});
