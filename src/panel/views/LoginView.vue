<template>
    <div class="container">
        <div class="row vh-100 justify-content-center align-items-center">
            <div
                class="col-12 col-md-6 shadow rounded-3"
                style="height: fit-content"
            >
                <div class="login-dialog p-3">
                    <TopText />
                    <CredentialsForm
                        :checking-status="apiKeyCheckingStatus"
                        @submit="afterCredentialsFormSubmit"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import TopText from "../components/login/TopText.vue";
import CredentialsForm from "../components/login/CredentialsForm.vue";
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
    components: { CredentialsForm, TopText },
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
                const isKeyCorrect =
                    await this.authStore.checkIfApiKeyIsCorrect();
                await this.authStore.getApiKeyPermission();
                this.updateApiKeyCheckingStatusByProvidingKeyCorrectness(
                    isKeyCorrect
                );
                if (isKeyCorrect) await router.replace({ name: "home" });
                this.authStore.save();
            } catch (e) {
                this.apiKeyCheckingStatus = CheckingApiKeyStatus.error;
                throw e;
            }
        },
    },
});
</script>
