<template>
  <div>
    <el-input v-model="lookback" placeholder="请输入需要考虑的天数"></el-input>
    <el-button @click="train"> 训练模型 </el-button>
    <el-progress :percentage="progress" status="success"></el-progress>
    <el-upload action="" :auto-upload="true" :on-change="uploadmodel" accept=".h5">
      <template v-slot:trigger>
        <el-button size="small" type="primary">上传模型</el-button>
      </template>
    </el-upload>
    <p>{{ message }}</p>
    <el-button v-if="message && message.value != '上传失败'" @click="getprediction"
      >预测数据</el-button
    >
    <el-button v-if="message && message.value != '上传失败'" @click="getmodel">下载模型</el-button>
    <br />
    <el-table :data="formData.value">
      <el-table-column prop="开盘" label="开盘"></el-table-column>
      <el-table-column prop="成交量" label="成交量"></el-table-column>
      <el-table-column prop="收盘" label="收盘"></el-table-column>
      <el-table-column prop="最低" label="最低"></el-table-column>
      <el-table-column prop="最高" label="最高"></el-table-column>
    </el-table>
  </div>
</template>

<style>
.el-progress {
  width: 300px;
  margin-top: 10px;
}
.el-input {
  width: 165px;
  margin-right: 10px;
}
</style>

<script>
import axios from 'axios'
import { ref, inject, reactive } from 'vue'
import { ElButton, ElInput, ElProgress, ElUpload, ElTable, ElTableColumn } from 'element-plus'
export default {
  components: {
    ElButton,
    ElInput,
    ElProgress,
    ElUpload,
    ElTable,
    ElTableColumn
  },
  setup() {
    const ip = inject('ip')
    const message = ref('')
    const lookback = ref(80)
    const progress = ref(0)
    const formData = reactive({ value: [] })

    function transformData(data) {
      const result = []
      for (let i = 0; i < Object.keys(data['开盘']).length; i++) {
        result.push({
          开盘: data['开盘'][i],
          成交量: data['成交量'][i],
          收盘: data['收盘'][i],
          最低: data['最低'][i],
          最高: data['最高'][i]
        })
      }
      return result
    }

    const getmodel = async () => {
      try {
        const response = await axios.post(
          `${ip.value}/model_download`,
          {},
          {
            responseType: 'blob'
          }
        )
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', '股票数据预测.h5') // 设置下载的文件名
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        message.value = '下载失败'
      }
    }

    const uploadmodel = async (file) => {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await axios.post(`${ip.value}/model_upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        message.value = response.data
      } catch (error) {
        message.value = '上传失败'
      }
    }

    const getprediction = async () => {
      try {
        const response = await axios.post(`${ip.value}/stock_predict`, {
          lookback: lookback.value
        })
        formData.value = transformData(response.data)
        message.value = '预测成功'
        console.log(formData)
      } catch (error) {
        message.value = '预测失败'
      }
    }
    const train = async () => {
      let timer = setInterval(() => {
        if (progress.value < 97) {
          progress.value++
        }
      }, 500)

      let timeout = setTimeout(() => {
        clearInterval(timer)
        message.value = '训练失败'
      }, 90 * 1100)

      try {
        const response = await axios.post(`${ip.value}/stock_train`, {
          lookback: lookback.value
        })
        clearTimeout(timeout)
        clearInterval(timer)
        progress.value = 100
        message.value = response.data
      } catch (error) {
        clearTimeout(timeout)
        clearInterval(timer)
        message.value = '训练失败'
      }
    }
    return {
      train,
      ip,
      message,
      lookback,
      progress,
      getprediction,
      formData,
      uploadmodel,
      getmodel,
      transformData
    }
  }
}
</script>
