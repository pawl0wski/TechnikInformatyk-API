import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/panel/",
            name: "Home",
            component: HomeView,
        },
        {
            path: "/panel/login",
            name: "Login",
            component: LoginView,
        },
    ],
});

export default router;
