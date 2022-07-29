<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Admin Panel</a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div id="navbarSupportedContent" class="collapse navbar-collapse">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a
                            :class="['nav-link', isNavLinkActive('home')]"
                            href="#"
                            >Home</a
                        >
                    </li>
                    <li class="nav-item">
                        <a
                            :class="['nav-link', isNavLinkActive('subject')]"
                            href="#"
                            >Subjects</a
                        >
                    </li>
                    <li class="nav-item">
                        <a
                            :class="['nav-link', isNavLinkActive('report')]"
                            href="#"
                            >Reports</a
                        >
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li
                        v-if="authStore.isKeyCorrect"
                        class="nav-item"
                        @click="logOut"
                    >
                        <a class="nav-link" href="#">Log out</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "../stores/authStore";
import router from "../router/router";

export default defineComponent({
    data(): { authStore: ReturnType<typeof useAuthStore> } {
        return { authStore: useAuthStore() };
    },
    methods: {
        isNavLinkActive(linkName: string): string {
            let currentRouteName = router.currentRoute.value.name;
            if (typeof currentRouteName != "string") currentRouteName = "";
            return currentRouteName.includes(linkName) ? "active" : "";
        },
        logOut() {
            this.authStore.logOut();
            this.authStore.save();
        },
    },
});
</script>
