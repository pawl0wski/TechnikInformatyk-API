<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h3 class="mt-5">Questions</h3>
                <QuestionCard
                    v-for="question in questions"
                    :key="question.uuid"
                    :question="question"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import QuestionCard from "../../components/question/QuestionCard.vue";
import { defineComponent } from "vue";
import { useQuestionStore } from "../../stores/questionStore";
import QuestionModel from "../../models/questionModel";
import { useExamStore } from "../../stores/examStore";

export default defineComponent({
    components: { QuestionCard },
    data(): {
        questionStore: ReturnType<typeof useQuestionStore>;
        examStore: ReturnType<typeof useExamStore>;
    } {
        return {
            examStore: useExamStore(),
            questionStore: useQuestionStore(),
        };
    },
    computed: {
        questions(): QuestionModel[] {
            return this.questionStore.questions as QuestionModel[];
        },
    },
    async mounted() {
        await this.questionStore.updateStateFromApi();
        await this.examStore.updateStateFromApi();
    },
});
</script>
