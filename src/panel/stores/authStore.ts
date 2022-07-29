import { defineStore } from "pinia";
import axios from "axios";
import ApiKeyResponseI from "../../interfaces/apiKeyResponse";

interface AuthState {
    apiKey: string;
    permission: string;
    isKeyCorrect: boolean | null;
}

export const useAuthStore = defineStore({
    id: "auth",
    state: (): AuthState => ({
        apiKey: "",
        permission: "",
        isKeyCorrect: null,
    }),
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

            if (apiResponse.status === 404 || apiResponse.status === 401)
                this.isKeyCorrect = false;
            this.isKeyCorrect = true;

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
    },
    getters: {
        httpHeaders: (state): { Authorization: string } => {
            return { Authorization: state.apiKey };
        },
    },
});
