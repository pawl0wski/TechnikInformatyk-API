<template>
    <form>
        <div class="mb-3">
            <label class="form-label">Authorization key</label>
            <input
                id="authKey"
                v-model="authKey"
                type="password"
                class="form-control"
            />
        </div>
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
import { defineComponent } from "vue";

export default defineComponent({
    emits: ["submit"],
    data(): { authKey: string } {
        return {
            authKey: "",
        };
    },
    methods: {
        emitFormSubmit() {
            this.$emit("submit", this.authKey);
        },
    },
});
</script>
