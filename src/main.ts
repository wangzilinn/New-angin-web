/*
 * @Description: 
 * @Author: Wang Zilin
 * @Date: 2021-06-01 23:25:30
 * @LastEditors: Wang Zilin
 * @LastEditTime: 2021-06-01 23:43:09
 */
import { createApp } from 'vue'
import App from './App.vue'
import {router} from './router'
// import {store} from './store/index'

const app = createApp({})
app.use(router)
// app.use(store)
app.mount('#app')

