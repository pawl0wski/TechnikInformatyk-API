import { defineStore } from "pinia";
import ExamResponseI from "../../interfaces/examResponse";
import { useAuthStore } from "./authStore";
import axios from "axios";

interface ExamState {
    exams: ExamResponseI[];
}

export const useExamStore = defineStore({
    id: "exam",
    state: (): ExamState => ({
        exams: [],
    }),
    actions: {
        async getFromApi() {
            const authStore = useAuthStore();
            const examsResponse = await axios.get("/exam", {
                headers: authStore.httpHeaders,
            });

            if (examsResponse.status == 200)
                this.exams = examsResponse.data.exams;
        },
    },
    getters: {
        mainExams: (state) => state.exams.filter((e) => e.type === "main"),
        subjectExams: (state) =>
            state.exams.filter((e) => e.type === "subject"),
    },
});
