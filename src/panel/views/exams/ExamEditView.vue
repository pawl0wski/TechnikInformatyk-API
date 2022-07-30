<template>
    <div class="container">
        <div class="row">
            <div class="col" v-if="exam != null">
                <h1 class="my-5">Exam editing</h1>
                <form>
                    <div class="mb-3">
                        <label for="uuidInput" class="form-label">UUID</label>
                        <input
                            id="uuidInput"
                            v-model="exam.uuid"
                            type="text"
                            class="form-control"
                            disabled
                        />
                    </div>
                    <div class="mb-3">
                        <label for="uuidInput" class="form-label">Name</label>
                        <input
                            id="nameInput"
                            v-model="exam.name"
                            type="text"
                            class="form-control"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="descriptionInput" class="form-label"
                            >Description</label
                        >
                        <textarea
                            id="descriptionInput"
                            v-model="exam.description"
                            class="form-control"
                        ></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="iconInput" class="form-label">Icon</label>
                        <input
                            id="iconInput"
                            v-model="exam.icon"
                            type="text"
                            class="form-control"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="typeInput" class="form-label">Type</label>
                        <select v-model="exam.type" class="form-select">
                            <option>main</option>
                            <option>subject</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ExamResponseI from "../../../interfaces/examResponse";
import { useExamStore } from "../../stores/examStore";
import router from "../../router/router";

export default defineComponent({
    data(): {
        uuid: string;
        exam: ExamResponseI | null;
    } {
        const uuid = this.$route.params.uuid.toString();
        return {
            uuid: uuid,
            exam: null,
        };
    },
    async created() {
        this.exam = await this.getExamOrRedirectToHomeIfNotExists();
    },
    methods: {
        async getExamOrRedirectToHomeIfNotExists(): Promise<ExamResponseI | null> {
            const examStore = useExamStore();
            await examStore.getContentFromApi();

            let exam = examStore.getCertainExam(this.uuid);
            if (exam === null) {
                alert(`Can't find exam with uuid: ${this.uuid}`);
                await router.replace({ name: "home" });
            }
            return exam;
        },
    },
});
</script>
