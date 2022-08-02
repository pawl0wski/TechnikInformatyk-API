import { defineConfig, UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    root: "src/admin/",
    plugins: [vue()],
    build: {
        outDir: "../../dist/admin",
    },
    base: "/admin/",
} as UserConfigExport);
