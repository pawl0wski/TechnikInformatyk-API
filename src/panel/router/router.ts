import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/panel/login",
            name: "Login Page",
            component: LoginPage,
        },
    ],
});

export default router;
