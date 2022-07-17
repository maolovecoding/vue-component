import DefaultTheme from "vitepress/theme";

import ZIcon from "@mao/components/icon";
import "@mao/theme-chalk"
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 在vitepress中注册全局组件
    app.use(ZIcon);
  }
};
