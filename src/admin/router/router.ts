import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import ExamsView from "../views/exams/ExamsView.vue";
import QuestionsView from "../views/questions/QuestionsView.vue";
import ReportView from "../views/reports/ReportView.vue";
import AuthorizationValidator from "./guard/validator/authorizationValidator";
import RouterGuard from "./guard/routerGuard";
import ExamEditView from "../views/exams/ExamEditView.vue";

const router = createRouter({
    history: createWebHistory("/admin/"),
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
            meta: {
                pageOptions: {
                    guardValidators: [new AuthorizationValidator()],
                },
            },
        },
        {
            path: "/exam/:uuid",
            name: "examEdit",
            component: ExamEditView,
            meta: {
                pageOptions: {
                    guardValidators: [new AuthorizationValidator()],
                },
            },
        },
        {
            path: "/reports",
            name: "reports",
            component: ReportView,
            meta: {
                pageOptions: {
                    guardValidators: [new AuthorizationValidator()],
                },
            },
        },
        {
            path: "/question",
            name: "questions",
            component: QuestionsView,
            meta: {
                pageOptions: {
                    guardValidators: [new AuthorizationValidator()],
                },
            },
        },
    ],
});

const routerGuard = new RouterGuard();

router.beforeEach((to, from, next) => {
    routerGuard.handleRouting(to, from, next);
});

export default router;
