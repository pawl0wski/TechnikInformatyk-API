import { defineStore } from "pinia";
import ApiGateway from "../lib/apiGateway/apiGateway";
import ExamModel from "../models/examModel";
import ExamResponseI from "../../interfaces/examResponse";

interface ExamState {
    exams: ExamModel[];
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

            if (examsResponse.status == 200) {
                this.exams = [];
                for (const examResponse of examsResponse.data) {
                    const exam = ExamModel.fromResponse(examResponse);
                    exam.alreadyInDatabase = true;
                    this.exams.push(exam);
                }
            }
        },
        getCertainExam(uuid: string): ExamModel | null {
            const examsWithCertainUuid = this.exams.filter(
                (e) => e.uuid == uuid
            );
            if (examsWithCertainUuid.length === 0) return null;
            return examsWithCertainUuid[0] as ExamModel;
        },
    },
    getters: {
        mainExams: (state) => state.exams.filter((e) => e.type === "main"),
        subjectExams: (state) =>
            state.exams.filter((e) => e.type === "subject"),
    },
});
