<template>
    <p class="text-danger">{{ checkingApiKeyStatusMessage }}</p>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CheckingApiKeyStatus } from "../../views/LoginView.vue";

export default defineComponent({
    props: {
        checkingStatus: {
            type: Number as PropType<CheckingApiKeyStatus>,
            required: true,
        },
    },
    computed: {
        checkingApiKeyStatusMessage(): string {
            switch (this.checkingStatus) {
                case CheckingApiKeyStatus.pending:
                    return "I validate the key...";
                case CheckingApiKeyStatus.incorrect:
                    return "The key is invalid please enter the correct key.";
                case CheckingApiKeyStatus.correct:
                    return "The key is corrected, you will be redirected in a moment";
                case CheckingApiKeyStatus.error:
                    return "An error occurred while checking the key";
                default:
                    return "";
            }
        },
    },
});
</script>
