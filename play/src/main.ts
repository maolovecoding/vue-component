import { createApp, Plugin } from "vue";
import App from "./App.vue";
import Icon from "@mao/components/icon";
import Tree from "@mao/components/tree";
const app = createApp(App);
const components: Plugin[] = [Icon, Tree];
components.forEach(cmp => app.use(cmp));
app.mount("#app");
