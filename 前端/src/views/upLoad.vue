<template>
  <div id="upload">
    <h1>上传数据</h1>
    <p>支持上传文件或输入股票代码来添加数据</p>
    <p>若是上传文件，请保证文件为csv，有日期、开盘、收盘、最高、最低、成交量这些列名</p>
    <p>若是通过股票代码，目前仅支持泸深A股</p>
    <el-button @click="toggleTransferMethod">{{
      transferMethod === 'file' ? '切换到代码输入' : '切换到文件上传'
    }}</el-button>
    <el-button @click="downloadData">下载数据</el-button>
    <el-checkbox v-model="choice">预处理</el-checkbox>
    <div id="control">
      <el-upload
        v-if="transferMethod === 'file'"
        action=""
        accept=".xlsx, .xls, .csv"
        :auto-upload="false"
        :on-change="handleFileUpload"
        :show-file-list="false"
        :multiple="false"
      >
        <template v-slot:trigger>
          <el-button type="primary">选择文件</el-button>
        </template>
      </el-upload>
      <el-input
        v-if="transferMethod === 'code'"
        v-model="NumberInput"
        placeholder="请输入股票代码"
        style="width: 130px"
      ></el-input>
      <el-button @click="sendData()">发送</el-button>
      <el-button v-if="state.tableData.length > 0" @click="getstatistic"
        >查看数据大体情况</el-button
      >
    </div>
    <el-dialog v-model="dialogVisible">
      <el-table :data="dataAsArray" style="width: 100%">
        <el-table-column prop="stat" label="Stat"></el-table-column>
        <el-table-column prop="开盘" label="开盘"></el-table-column>
        <el-table-column prop="收盘" label="收盘"></el-table-column>
        <el-table-column prop="最高" label="最高"></el-table-column>
        <el-table-column prop="最低" label="最低"></el-table-column>
        <el-table-column prop="成交量" label="成交量"></el-table-column>
      </el-table>
    </el-dialog>
    <el-table
      :data="state.tableData.slice((state.currentPage - 1) * 7, state.currentPage * 7)"
      style="width: 100%"
    >
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="open" label="开盘"></el-table-column>
      <el-table-column prop="close" label="收盘"></el-table-column>
      <el-table-column prop="high" label="最高"></el-table-column>
      <el-table-column prop="low" label="最低"></el-table-column>
      <el-table-column prop="volume" label="成交量"></el-table-column>
    </el-table>
    <el-pagination
      @current-change="handlePageChange"
      :current-page="state.currentPage"
      :page-size="7"
      layout="prev, pager, next"
      :total="state.tableData.length"
    ></el-pagination>
  </div>
</template>

<style scoped>
#control {
  margin: 20px 0;
  display: flex;
  width: 100%;
}

.el-input {
  margin: 0 10px;
  margin-bottom: 0.5px;
}

.el-button {
  margin: 0 10px;
}

.el-checkbox {
  margin: 0 10px;
}
</style>

<script>
import axios from 'axios'
import { inject, ref, reactive, computed } from 'vue'
import {
  ElButton,
  ElUpload,
  ElInput,
  ElPagination,
  ElTable,
  ElTableColumn,
  ElCheckbox,
  ElDialog
} from 'element-plus'
import { useStore } from '../stores/data.js'

export default {
  components: {
    ElButton,
    ElUpload,
    ElInput,
    ElPagination,
    ElTable,
    ElTableColumn,
    ElCheckbox,
    ElDialog
  },
  setup() {
    const state = reactive({
      tableData: [],
      currentPage: 1
    })

    const ip = inject('ip')
    const transferMethod = ref('file')

    const choice = ref(false)
    const selectedFile = ref(null)
    const NumberInput = ref('')
    const dialogVisible = ref(false)
    const data = reactive({})
    const dataAsArray = computed(() => {
      const keys = Object.keys(data)
      const stats = ['25%', '50%', '75%', 'count', 'max', 'mean', 'min', 'std']
      return stats.map((stat) => {
        const row = { stat }
        keys.forEach((key) => {
          // 检查数据是否为数字，如果是，使用 toFixed(3) 保留三位小数
          if (typeof data[key][stat] === 'number') {
            row[key] = data[key][stat].toFixed(3)
          } else {
            row[key] = data[key][stat]
          }
        })
        return row
      })
    })

    const store = useStore()

    const toggleTransferMethod = () => {
      transferMethod.value = transferMethod.value === 'file' ? 'code' : 'file'
    }

    async function getstatistic() {
      try {
        const response = await axios.post(`${ip.value}/stock_statistic`)
        console.log(response.data)
        dialogVisible.value = true
        Object.assign(data, response.data)
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }

    async function downloadData() {
      const response = await axios({
        url: `${ip.value}/stock_download`,
        method: 'POST',
        data: {
          choice: choice.value ? 1 : 0
        },
        responseType: 'blob' // 表示服务器返回的数据类型是二进制文件
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'stock_data.csv')
      document.body.appendChild(link)
      link.click()
    }

    async function sendData() {
      if (transferMethod.value === 'file') {
        const formData = new FormData()
        formData.append('file', selectedFile.value)

        try {
          const response = await axios.post(`${ip.value}/stock_upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          console.log(response.data)
          state.tableData = response.data.map((item) => ({
            date: item['日期'],
            open: item['开盘'],
            close: item['收盘'],
            high: item['最高'],
            low: item['最低'],
            volume: item['成交量']
          }))
          store.setTableData(state.tableData)
          state.currentPage = 1
        } catch (error) {
          console.error(error)
        }
      } else {
        try {
          const params = new URLSearchParams()
          params.append('stock_code', NumberInput.value)

          const response = await axios.post(`${ip.value}/stock_get`, params)
          console.log(response.data)
          state.tableData = response.data.map((item) => ({
            date: item['日期'],
            open: item['开盘'],
            close: item['收盘'],
            high: item['最高'],
            low: item['最低'],
            volume: item['成交量']
          }))
          store.setTableData(state.tableData)
          state.currentPage = 1
        } catch (error) {
          console.error(error)
        }
      }
    }

    function handleFileUpload(file, fileList) {
      console.log(file, fileList)
      selectedFile.value = file.raw
    }
    function handlePageChange(page) {
      state.currentPage = page
    }
    return {
      ip,
      transferMethod,
      selectedFile,
      NumberInput,
      toggleTransferMethod,
      store,
      sendData,
      downloadData,
      handleFileUpload,
      handlePageChange,
      dialogVisible,
      getstatistic,
      data,
      state,
      choice,
      dataAsArray
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
