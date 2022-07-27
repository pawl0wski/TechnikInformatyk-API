import { defineConfig, UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    root: "src/panel/",
    plugins: [vue()],
    build: {
        outDir: "../../dist/panel",
    },
    base: "/panel/",
} as UserConfigExport);
