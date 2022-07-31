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
import QuestionModel from "../../models/questionModel";
import { useQuestionStore } from "../../stores/questionStore";

export default defineComponent({
    components: { QuestionCard },
    data(): {
        questions: QuestionModel[];
        questionStore: ReturnType<typeof useQuestionStore>;
    } {
        const questionStore = useQuestionStore();
        return {
            questions: questionStore.questions as QuestionModel[],
            questionStore,
        };
    },
    async beforeCreate() {
        await this.questionStore.getContentFromApi();
    },
});
</script>
