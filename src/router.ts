/*
 * @Description: router
 * @Author: Wang Zilin
 * @Date: 2021-06-01 23:35:47
 * @LastEditors: Wang Zilin
 * @LastEditTime: 2021-06-03 23:11:30
 */

import {createRouter, createWebHashHistory} from'vue-router'

// 这里不能使用大括号
import frontLayout from './front-views/Layout.vue'
import frontIndex from './front-views/Index.vue'

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
 const routes = [
    {
        path: '/',
        component: frontLayout,
        children: [{
          path: '',
          component: frontIndex,
        }]
    }
]
 
// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router;

