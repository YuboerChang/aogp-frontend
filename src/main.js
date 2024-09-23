import { createApp } from "vue";
import App from "./App";
import store from "./store/store";
import router from "./router/router";
import elementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(elementPlus);
app.mount("#app");

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
