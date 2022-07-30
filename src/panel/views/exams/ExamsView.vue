<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1>Exams</h1>
                <h3>Main exams</h3>
                <div class="row gap-5">
                    <ExamCard
                        v-for="exam in examStore.mainExams"
                        :key="exam.uuid"
                        :exam="exam"
                    />
                </div>
                <h3>Subject exams</h3>
                <div class="row gap-5">
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
import ExamCard from "../../components/ExamsView/ExamCard.vue";

export default defineComponent({
    components: { ExamCard },
    data(): { examStore: ReturnType<typeof useExamStore> } {
        return {
            examStore: useExamStore(),
        };
    },
    async mounted() {
        await this.examStore.getContentFromApi();
    },
});
</script>
