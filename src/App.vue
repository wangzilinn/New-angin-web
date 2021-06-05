<!--
 * @Description: 单页入口
 * @Author: Wang Zilin
 * @Date: 2021-06-01 23:25:30
 * @LastEditors: Wang Zilin
 * @LastEditTime: 2021-06-03 22:56:22
-->
<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script lang="ts">
export default {
    metaInfo: {
    // 如果子component中没有定义 metaInfo.title ，会默认使用这个title
    title: 'Angin',
    meta: [
      { name: 'description', content: '这是一个记录自己学习笔记的地方, 欢迎踩一踩' },
      { name: 'keywords', content: '王子林,wangzilin,Angin,java,后端' }
    ]
  },
  name: 'App'
}
</script>

