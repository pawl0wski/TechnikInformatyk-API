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
    state: (): AuthState => ({
        apiKey: "",
        permission: "",
        correct: null,
    }),
    actions: {
        setApiKey(apiKey: string) {
            this.apiKey = apiKey;
        },
        async checkIfApiKeyIsCorrect() {
            const apiResponse = await axios.get(`/key/${this.apiKey}`);

            if (apiResponse.status === 404) this.correct = false;
            this.correct = true;
        },
        async getApiKeyPermission() {
            const apiResponse = await axios.get(`/key/${this.apiKey}`);

            if (apiResponse.status === 404) {
                this.permission = (
                    apiResponse.data as ApiKeyResponseI
                ).permission;
            }
        },
    },
});
