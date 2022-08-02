<template>
    <div class="card my-3" style="width: 100%">
        <div class="card-body">
            <h5 class="card-title">{{ question.uuid }}</h5>
            <p class="card-text">{{ question.content }}</p>
            <p v-for="(answer, i) in answers" :key="i" class="card-text">
                <small
                    :class="
                        i === question.correctAnswer
                            ? 'text-success'
                            : 'text-muted'
                    "
                    >{{ answer }}</small
                >
            </p>
            <p v-if="examNames.length > 0" class="card-text">
                Used in: {{ examNames.join(", ") }}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import QuestionModel from "../../models/questionModel";
import { useExamStore } from "../../stores/examStore";

export default defineComponent({
    props: {
        question: {
            type: Object as PropType<QuestionModel>,
            required: true,
        },
    },
    computed: {
        answers(): string[] {
            const { answerA, answerB, answerC, answerD } = this.question;
            return [answerA, answerB, answerC, answerD];
        },
        examNames(): string[] {
            const examStore = useExamStore();
            const examNames: string[] = [];
            for (const examUuid of this.question.examUuids) {
                const exam = examStore.getCertainExam(examUuid);
                console.log(exam);
                if (exam != null) examNames.push(exam.name);
            }
            return examNames;
        },
    },
});
</script>
