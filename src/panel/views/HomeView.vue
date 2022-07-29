<template>
    <div class="container">
        <div class="row vh-100 align-items-center text-center">
            <div class="col-12">
                <h1>{{ welcomeMessage }}</h1>
                <p class="text-muted">What are you planning to do today?</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    computed: {
        welcomeMessage(): string {
            const currentHour = new Date().getHours();

            if (currentHour > 6 && currentHour < 12) return "Good Morning";
            if (currentHour >= 12 && currentHour < 20) return "Good Afternoon";
            return "Good Night";
        },
    },
});
</script>
