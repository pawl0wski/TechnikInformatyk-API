import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import ExamsView from "../views/exams/ExamsView.vue";
import ReportView from "../views/reports/ReportView.vue";
import AuthorizationValidator from "./guard/validator/authorizationValidator";
import RouterGuard from "./guard/routerGuard";
import ExamEditView from "../views/exams/ExamEditView.vue";

const router = createRouter({
    history: createWebHistory("/panel/"),
    routes: [
        {
            path: "",
            name: "home",
            component: HomeView,
            meta: {
                pageOptions: {
                    guardValidators: [new AuthorizationValidator()],
                },
            },
        },
        {
            path: "/login",
            name: "login",
            component: LoginView,
        },
        {
            path: "/exam",
            name: "exams",
            component: ExamsView,
        },
        {
            path: "/exam/:uuid",
            name: "examEdit",
            component: ExamEditView,
        },
        {
            path: "/reports",
            name: "reports",
            component: ReportView,
        },
    ],
});

const routerGuard = new RouterGuard();

router.beforeEach((to, from, next) => {
    routerGuard.handleRouting(to, from, next);
});

export default router;
