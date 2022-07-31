import { defineStore } from "pinia";
import ApiGateway from "../lib/apiGateway/apiGateway";
import ExamModel from "../models/examModel";

interface ExamState {
    exams: ExamModel[];
}

export const useExamStore = defineStore({
    id: "exam",
    state: (): ExamState => {
        return { exams: [] };
    },
    actions: {
        async updateStateFromApi() {
            this.exams = await ExamModel.getAllModelsFromApi();
        },
        getCertainExam(uuid: string): ExamModel | null {
            const examsWithCertainUuid = this.exams.filter(
                (e) => e.uuid == uuid
            );
            if (examsWithCertainUuid.length === 0) return null;
            return examsWithCertainUuid[0] as ExamModel;
        },
        addExam(exam: ExamModel) {
            this.exams.push(exam);
        },
    },
    getters: {
        mainExams: (state) => state.exams.filter((e) => e.type === "main"),
        subjectExams: (state) =>
            state.exams.filter((e) => e.type === "subject"),
    },
});
