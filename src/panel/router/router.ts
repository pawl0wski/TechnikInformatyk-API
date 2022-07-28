import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/panel/login",
            name: "Login",
            component: LoginView,
        },
    ],
});

export default router;
