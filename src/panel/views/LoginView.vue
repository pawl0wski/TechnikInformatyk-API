<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-6 shadow-sm rounded-3">
                <div class="login-dialog p-3">
                    <TopText />
                    <CredentialsForm
                        @submit="applyApiKeyInStorageAndCheckCorrectness"
                    />
                    <CheckingStatusMessage
                        :checking-status="apiKeyCheckingStatus"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import TopText from "../components/LoginView/TopText.vue";
import CredentialsForm from "../components/LoginView/CredentialsForm.vue";
import CheckingStatusMessage from "../components/LoginView/CheckingStatusMessage.vue";
import { useAuthStore } from "../stores/authStore";

export enum CheckingApiKeyStatus {
    pending,
    incorrect,
    correct,
    error,
    none,
}

export default {
    components: { CredentialsForm, TopText, CheckingStatusMessage },
    data(): { apiKeyCheckingStatus: CheckingApiKeyStatus } {
        return { apiKeyCheckingStatus: CheckingApiKeyStatus.none };
    },

    methods: {
        async applyApiKeyInStorageAndCheckCorrectness(apiKey: string) {
            const authStore = useAuthStore();
            (this as any).apiKeyCheckingStatus = CheckingApiKeyStatus.pending;
            authStore.setApiKey(apiKey);
            try {
                const isApiKeyCorrect =
                    await authStore.checkIfApiKeyIsCorrect();
                if (!isApiKeyCorrect)
                    (this as any).apiKeyCheckingStatus =
                        CheckingApiKeyStatus.incorrect;
            } catch (e) {
                (this as any).apiKeyCheckingStatus = CheckingApiKeyStatus.error;
            }
        },
    },
};
</script>
