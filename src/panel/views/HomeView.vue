<template>
    <button class="btn btn-primary" @click="goToLoginView">Login</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "../router/router";

export default defineComponent({
    methods: {
        goToLoginView() {
            router.push({ name: "login" });
        },
    },
});
</script>
