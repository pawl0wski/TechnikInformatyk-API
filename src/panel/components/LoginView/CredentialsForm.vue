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
            <button type="submit" class="btn btn-primary ms-auto">Login</button>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    data(): { authKey: string } {
        return {
            authKey: "",
        };
    },
});
</script>
