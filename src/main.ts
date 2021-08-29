/*
 * @Description:
 * @Author: Zillion Wang
 * @Date: 2021-06-01 23:25:30
 * @LastEditors: Zillion Wang
 * @LastEditTime: 2021-06-05 23:31:05
 */
import { createApp } from "vue";
import router from "./router";
import ElementPlus from "element-plus";
import { store, key } from "./store/index";

import "element-plus/lib/theme-chalk/index.css";
import "./styles/style.min.css";
// 导入入口组件
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(store, key);
app.mount("#app");
