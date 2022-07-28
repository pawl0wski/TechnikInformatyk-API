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
            switch ((this as any).checkingStatus) {
                case CheckingApiKeyStatus.pending:
                    return "Key checking...";
                case CheckingApiKeyStatus.incorrect:
                    return "Incorrect key!";
                case CheckingApiKeyStatus.correct:
                    return "Correct key";
                case CheckingApiKeyStatus.error:
                    return "Error occurred while checking key";
                default:
                    return "";
            }
        },
    },
});
</script>
