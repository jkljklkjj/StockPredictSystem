<template>
  <div id="visual">
    <h1>数据可视化</h1>
    <p>上传数据后即可可视化股票数据</p>
    <p>采用K线图的方式来让股票数据更加直观</p>
    <br />
    <p>请输入需要可视化的时间段</p>
    <el-date-picker
      v-model="dateRange"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
    ></el-date-picker>
    <el-button @click="filterData">筛选数据</el-button>
    <div id="chart" ref="chartRef" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script>
import { useStore } from '../stores/data.js'
import { ElDatePicker, ElButton } from 'element-plus'
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

export default {
  components: {
    ElDatePicker,
    ElButton
  },
  setup() {
    const store = useStore()
    const tableData = store.tableData
    const chartRef = ref(null)
    let chartInstance = null

    onMounted(() => {
      chartInstance = echarts.init(chartRef.value)
    })
    const dateRange = ref(null)

    const filterData = () => {
      console.log('开始进行筛选')
      console.log(dateRange.value)
      if (dateRange.value) {
        let [startDate, endDate] = dateRange.value

        // 检查开始日期和结束日期是否在 tableData 中
        const startExists = store.tableData.some(
          (item) => new Date(item.date).getTime() === startDate.getTime()
        )
        const endExists = store.tableData.some(
          (item) => new Date(item.date).getTime() === endDate.getTime()
        )

        if (!startExists) {
          // 如果开始日期不在 tableData 中，选择最接近的日期
          const closestStart = store.tableData.reduce((prev, curr) => {
            const currDate = new Date(curr.date)
            const prevDate = new Date(prev.date)
            return Math.abs(currDate - startDate) < Math.abs(prevDate - startDate) ? curr : prev
          })
          startDate = new Date(closestStart.date)
        }

        if (!endExists) {
          // 如果结束日期不在 tableData 中，选择最接近的日期
          const closestEnd = store.tableData.reduce((prev, curr) => {
            const currDate = new Date(curr.date)
            const prevDate = new Date(prev.date)
            return Math.abs(currDate - endDate) < Math.abs(prevDate - endDate) ? curr : prev
          })
          endDate = new Date(closestEnd.date)
        }
        console.log('筛选的日期范围', startDate, endDate)

        // 筛选出在新的日期范围内的数据
        tableData.value = store.tableData.filter((item) => {
          const date = new Date(item.date)
          return date >= startDate && date <= endDate
        })
        console.log('筛选后的数据', tableData.value)
      }
      // 更新图表
      if (chartInstance) {
        const option = {
          xAxis: {
            type: 'category',
            data: tableData.value.map((item) => item.date)
          },
          yAxis: [
            {
              type: 'value'
            },
            {
              type: 'value'
            }
          ],
          series: [
            {
              type: 'candlestick',
              data: tableData.value.map((item) => [item.open, item.close, item.low, item.high]),
              yAxisIndex: 0
            },
            {
              type: 'bar',
              data: tableData.value.map((item) => item.volume),
              yAxisIndex: 1
            }
          ]
        }
        chartInstance.setOption(option)
      }
    }
    return {
      store,
      tableData,
      dateRange,
      filterData,
      chartRef
    }
  }
}
</script>
