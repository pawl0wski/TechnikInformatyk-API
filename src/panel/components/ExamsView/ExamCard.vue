<template>
    <div class="card" style="width: 18rem">
        <div class="card-body">
            <h5 class="card-title">{{ exam.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ exam.uuid }}</h6>
            <p class="card-text">
                {{ exam.description }}
            </p>
            <a href="#" class="card-link">Edit</a>
            <a href="#" class="card-link">Manage questions</a>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ExamResponseI from "../../../interfaces/examResponse";

export default defineComponent({
    prop: {
        exam: {
            type: Object as PropType<ExamResponseI>,
            required: true,
        },
    },
});
</script>
