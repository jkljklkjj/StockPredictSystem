<template>
  <div id="introduction">
    <h1>欢迎来到股票预测平台！</h1>
    <h2>项目背景：</h2>
    <p>本项目是一个股票预测平台，通过数据分析和机器学习技术，预测未来股票数据。</p>
    <p>项目使用Vue3 + Vite + Element Plus + Flask + Python实现。</p>
    <p>通过预测股票数据，可以为您的金融事业提供可靠的建议</p>
    <h2>功能介绍：</h2>
    <p>1.查询股票代码，通过股票代码或用户上传来获取数据</p>
    <p>2.数据预处理，数据可视化</p>
    <p>3.模型训练，预测未来股票数据</p>
    <el-footer>版权所有 © 2022</el-footer>
  </div>
</template>

<style scoped>
.el-footer {
  padding: 20px 0;
  text-align: center;
  color: #999;
  background-color: #333;
  border-top: 1px solid #ddd;
  position: absolute;
}
</style>

<script>
import { ElFooter } from 'element-plus'

export default {
  components: {
    ElFooter
  }
}
</script>
