/*
 * @Description: 
 * @Author: Wang Zilin
 * @Date: 2021-06-01 23:25:30
 * @LastEditors: Wang Zilin
 * @LastEditTime: 2021-06-03 23:06:21
 */
import { createApp } from 'vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import { store, key } from './store/index'
// 导入入口组件
import App from './App.vue'



const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(store, key)
app.mount('#app')


