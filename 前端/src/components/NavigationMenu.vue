<template>
  <div class="menu-container">
    <div id="logo">股票预测平台</div>
    <el-menu @select="handleSelect">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">上传数据</el-menu-item>
      <el-menu-item index="3">数据可视化</el-menu-item>
      <el-menu-item index="4">模型预测</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { ElMenu, ElMenuItem } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleSelect = (index) => {
  switch (index) {
    case '1':
      router.push('/')
      break
    case '2':
      router.push('/upload')
      break
    case '3':
      router.push('/visual')
      break
    case '4':
      router.push('/predict')
      break
  }
}
</script>

<style scoped>
#logo {
  display: flex;
  justify-content: center;
  font-size: 20px;
  background-color: gold;
  padding: 20px 0;
  width: 100%;
}

#menu-container {
  display: flex;
  align-items: center;
  height: 100%;
}

.el-menu {
  height: 90%;
  background-color: aliceblue;
}

.el-menu-item:hover {
  background-color: skyblue;
}
</style>
