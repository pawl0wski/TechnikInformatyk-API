<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-6 shadow-sm rounded-3">
                <div class="login-dialog p-3">
                    <TopText />
                    <CredentialsForm @submit="afterCredentialsFormSubmit" />
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
import { defineComponent } from "vue";
import router from "../router/router";

export enum CheckingApiKeyStatus {
    pending,
    incorrect,
    correct,
    error,
    none,
}

export default defineComponent({
    components: { CredentialsForm, TopText, CheckingStatusMessage },
    data(): {
        apiKeyCheckingStatus: CheckingApiKeyStatus;
        authStore: ReturnType<typeof useAuthStore>;
    } {
        return {
            apiKeyCheckingStatus: CheckingApiKeyStatus.none,
            authStore: useAuthStore(),
        };
    },

    methods: {
        async applyApiKeyInStore(apiKey: string) {
            this.authStore.setApiKey(apiKey);
            this.apiKeyCheckingStatus = CheckingApiKeyStatus.pending;
        },
        async checkApiKeyStoredInStore(): Promise<boolean> {
            return await this.authStore.checkIfApiKeyIsCorrect();
        },
        updateApiKeyCheckingStatusByProvidingKeyCorrectness(
            isApiKeyCorrect: boolean
        ) {
            this.apiKeyCheckingStatus = isApiKeyCorrect
                ? CheckingApiKeyStatus.correct
                : CheckingApiKeyStatus.incorrect;
        },
        async afterCredentialsFormSubmit(apiKey: string) {
            try {
                await this.applyApiKeyInStore(apiKey);
                const isKeyCorrect = await this.checkApiKeyStoredInStore();
                this.updateApiKeyCheckingStatusByProvidingKeyCorrectness(
                    isKeyCorrect
                );
                if (isKeyCorrect) {
                    await router.replace({ name: "home" });
                }
            } catch (e) {
                this.apiKeyCheckingStatus = CheckingApiKeyStatus.error;
            }
        },
    },
});
</script>
