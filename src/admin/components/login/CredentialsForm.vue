<template>
    <form>
        <div class="mb-3">
            <label class="form-label">Authorization key</label>
            <input
                id="apiKey"
                v-model="apiKey"
                type="password"
                class="form-control"
            />
        </div>
        <CheckingStatusMessage :checking-status="checkingStatus" />
        <div class="d-flex align-items-end">
            <button
                type="submit"
                class="btn btn-primary ms-auto"
                @click.prevent="emitFormSubmit"
            >
                Login
            </button>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CheckingApiKeyStatus } from "../../views/LoginView.vue";
import CheckingStatusMessage from "./CheckingStatusMessage.vue";

export default defineComponent({
    components: {
        CheckingStatusMessage,
    },
    props: {
        checkingStatus: {
            type: Number as PropType<CheckingApiKeyStatus>,
            required: true,
        },
    },
    emits: ["submit"],
    data(): { apiKey: string } {
        return {
            apiKey: "",
        };
    },
    methods: {
        emitFormSubmit() {
            this.$emit("submit", this.apiKey);
        },
    },
});
</script>
