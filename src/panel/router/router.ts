import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import AuthorizationValidator from "./guard/validator/authorizationValidator";
import RouterGuard from "./guard/routerGuard";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/panel/",
            name: "home",
            component: HomeView,
            meta: {
                pageOptions: {
                    guardValidators: [new AuthorizationValidator()],
                },
            },
        },
        {
            path: "/panel/login",
            name: "login",
            component: LoginView,
        },
    ],
});

const routerGuard = new RouterGuard();

router.beforeEach((to, from, next) => {
    routerGuard.handleRouting(to, from, next);
});

export default router;
