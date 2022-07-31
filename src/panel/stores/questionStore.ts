import { defineStore } from "pinia";
import QuestionModel from "../models/questionModel";

interface QuestionStoreState {
    questions: QuestionModel[];
}

export const useQuestionStore = defineStore({
    id: "question",
    state: (): QuestionStoreState => {
        return {
            questions: [],
        };
    },
});
