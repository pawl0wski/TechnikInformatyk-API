<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <button
                    class="btn btn-success mt-3"
                    @click.prevent="onCreateNewExamClick"
                >
                    Create new exam
                </button>
                <h3 class="mt-2">Main exams</h3>
                <div class="row gap-5 my-3">
                    <ExamCard
                        v-for="exam in examStore.mainExams"
                        :key="exam.uuid"
                        :exam="exam"
                    />
                </div>
                <h3 class="mt-5">Subject exams</h3>
                <div class="row gap-5 my-3">
                    <ExamCard
                        v-for="exam in examStore.subjectExams"
                        :key="exam.uuid"
                        :exam="exam"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useExamStore } from "../../stores/examStore";
import { defineComponent } from "vue";
import ExamCard from "../../components/exam/ExamCard.vue";
import { v4 as generateUuid } from "uuid";
import ExamModel from "../../models/examModel";

export default defineComponent({
    components: { ExamCard },
    data(): { examStore: ReturnType<typeof useExamStore> } {
        return {
            examStore: useExamStore(),
        };
    },
    async mounted() {
        await this.examStore.updateStateFromApi();
    },
    methods: {
        onCreateNewExamClick() {
            const uuid = generateUuid();
            const newExam = new ExamModel();
            newExam.uuid = uuid;
            this.examStore.addExam(newExam);

            this.$router.push({
                name: "examEdit",
                params: {
                    uuid: uuid,
                },
            });
        },
    },
});
</script>
