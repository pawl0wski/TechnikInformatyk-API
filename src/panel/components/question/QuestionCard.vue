<template>
    <div class="card" style="width: 100%">
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
        </div>
        <ul class="list-group list-group-flush">
            <li v-for="exam in exams" :key="exam.uuid" class="list-group-item">
                {{ exam.name }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import QuestionModel from "../../models/questionModel";
import ExamModel from "../../models/examModel";
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
        exams(): ExamModel[] {
            const examStore = useExamStore();
            const exams: ExamModel[] = [];
            for (const examUuid of this.question.examUuids) {
                const exam = examStore.getCertainExam(examUuid);
                if (exam != null) exams.push();
            }
            return exams;
        },
    },
});
</script>
