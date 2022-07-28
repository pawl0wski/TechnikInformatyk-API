import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
