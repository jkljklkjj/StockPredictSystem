<script setup>
import { RouterView } from 'vue-router'
import { ref, provide } from 'vue'
import 'element-plus/dist/index.css'

import NavigationMenu from './components/NavigationMenu.vue'
const ip = ref('http://127.0.0.1:5000/')
provide('ip', ip)
</script>

<template>
  <!-- 1.介绍项目背景、功能
  2.查询股票代码，通过股票代码或用户上传来获取数据
  3.数据预处理，数据可视化
  4.模型训练，预测未来股票数据 -->
  <NavigationMenu id="NavigationMenu" />
  <router-view id="router-view" />
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 10%;
}

#NavigationMenu {
  height: 100%;
  flex: 0 0 30%;
}

#router-view {
  flex: 0 0 70%;
  padding: 50px;
  height: 100%;
}
</style>
