<template>
    <div class="container">
        <div class="row">
            <div v-if="exam != null" class="col">
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
                    <button
                        class="btn btn-danger me-2"
                        @click.prevent="onDeleteButtonPress"
                    >
                        Delete
                    </button>
                    <button
                        class="btn btn-primary"
                        type="submit"
                        @click.prevent="onSaveButtonPress"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useExamStore } from "../../stores/examStore";
import router from "../../router/router";
import ExamModel from "../../models/examModel";

export default defineComponent({
    data(): {
        uuid: string;
        exam: ExamModel | null;
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
        async getExamOrRedirectToHomeIfNotExists(): Promise<ExamModel | null> {
            const examStore = useExamStore();
            await examStore.getContentFromApi();

            let exam = examStore.getCertainExam(this.uuid);
            if (exam === null) {
                alert(`Can't find exam with uuid: ${this.uuid}`);
                await router.replace({ name: "home" });
                return null;
            }
            return exam.copy();
        },
        async onSaveButtonPress() {
            await this.saveExam();
            await useExamStore().getContentFromApi();
            alert("Exam saved");
        },
        async saveExam() {
            if (this.exam != null) {
                await this.exam.createOrUpdateIfAlreadyInDatabase();
            }
        },
        async onDeleteButtonPress() {
            await this.deleteExam();
            await useExamStore().getContentFromApi();
            alert("Exam deleted");
            router.go(-1);
        },
        async deleteExam() {
            if (this.exam != null) {
                await this.exam.delete();
            }
        },
    },
});
</script>
