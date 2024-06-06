import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    tableData: []
  }),
  actions: {
    setTableData(data) {
      this.tableData = data
    }
  }
})
