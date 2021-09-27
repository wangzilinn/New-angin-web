<!--
 * @Description: 单页入口
 * @Author: Zillion Wang
 * @Date: 2021-06-01 23:25:30
 * @LastEditors: Zillion Wang
 * @LastEditTime: 2021-06-03 22:56:22
-->
<template>
  <metainfo>
    <template v-slot:title="{ content }">{{
      content ? `${content} | Angin` : `Angin`
    }}</template>
  </metainfo>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useMeta } from "vue-meta";

export default defineComponent({
  setup() {
    useMeta({
      title: "",
      htmlAttrs: { lang: "en", amp: true },
      meta: [
        { name: "description", content: "这是一个记录自己学习笔记的地方" },
        { name: "keywords", content: "王子林,wangzilin,Angin,java,后端" },
      ],
    });
  },
  name: "App",
});
</script>

