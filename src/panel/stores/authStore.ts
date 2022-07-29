import { defineStore } from "pinia";
import axios from "axios";
import ApiKeyResponseI from "../../interfaces/apiKeyResponse";

interface AuthState {
    apiKey: string;
    permission: string;
    correct: boolean | null;
}

export const useAuthStore = defineStore({
    id: "auth",
    state: (): AuthState => {
        const savedAuthStorage = sessionStorage.getItem("AuthState");

        return savedAuthStorage == null
            ? {
                  apiKey: "",
                  permission: "",
                  correct: null,
              }
            : (JSON.parse(savedAuthStorage) as AuthState);
    },
    actions: {
        setApiKey(apiKey: string) {
            this.apiKey = apiKey;
        },
        async checkIfApiKeyIsCorrect(): Promise<boolean> {
            const apiResponse = await axios.get(`/key/${this.apiKey}`, {
                headers: this.httpHeaders,
                validateStatus: (status) => {
                    return [200, 404, 401].includes(status);
                },
            });

            this.correct = !(
                apiResponse.status === 404 || apiResponse.status === 401
            );

            return this.isKeyCorrect;
        },
        async getApiKeyPermission(): Promise<string> {
            const apiResponse = await axios.get(`/key/${this.apiKey}`, {
                headers: this.httpHeaders,
            });

            if (apiResponse.status === 200) {
                this.permission = (
                    apiResponse.data as ApiKeyResponseI
                ).permission;
            }

            return this.permission;
        },
        async logOut() {
            this.correct = false;
        },
        save() {
            sessionStorage.setItem("AuthState", JSON.stringify(this.$state));
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
