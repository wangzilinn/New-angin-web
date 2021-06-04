/*
 * @Description: 
 * @Author: Wang Zilin
 * @Date: 2021-06-01 23:25:30
 * @LastEditors: Wang Zilin
 * @LastEditTime: 2021-06-03 23:06:21
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import {store} from './store/index'


const app = createApp(App)
app.use(router)
// app.use(store)
app.mount('#app')


