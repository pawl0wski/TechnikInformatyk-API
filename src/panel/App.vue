<template>
    <NavBar />
    <router-view />
</template>
<script>
import NavBar from "./components/NavBar.vue";
import { defineComponent } from "vue";

export default defineComponent({
    components: { NavBar },
});
</script>
