import { defineStore } from "pinia";
import ExamResponseI from "../../interfaces/examResponse";
import { useAuthStore } from "./authStore";
import axios from "axios";
import ApiGateway from "../lib/apiGateway/apiGateway";

interface ExamState {
    exams: ExamResponseI[];
}

export const useExamStore = defineStore({
    id: "exam",
    state: (): ExamState => {
        return { exams: [] };
    },
    actions: {
        async getContentFromApi() {
            const examsResponse =
                await ApiGateway.withDefaultApiStore().getExams();

            if (examsResponse.status == 200) this.exams = examsResponse.data;
        },
    },
    getters: {
        mainExams: (state) => state.exams.filter((e) => e.type === "main"),
        subjectExams: (state) =>
            state.exams.filter((e) => e.type === "subject"),
    },
});
