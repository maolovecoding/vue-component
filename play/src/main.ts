import { createApp, Plugin } from "vue";
import App from "./App.vue";
import Icon from "@mao/components/icon";
const app = createApp(App);
const components: Plugin[] = [Icon];
components.forEach((cmp) => app.use(cmp));
app.mount("#app");
