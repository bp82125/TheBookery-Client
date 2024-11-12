// stores/useOverviewStore.js
import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'

export const useOverviewStore = defineStore('overview', {
  state: () => ({
    counts: {
      sach: 0,
      docGia: 0,
      nhanVien: 0,
      theoDoiMuonSach: 0
    },
    chartData: [],
    recentTDMS: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchCounts() {
      this.loading = true
      this.error = null
      try {
        const { data } = await axiosInstance.get('/tong-quan/count')
        this.counts = data.data
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async fetchChartData() {
      this.loading = true
      this.error = null
      try {
        const { data } = await axiosInstance.get('/tong-quan/chart')
        this.chartData = data.data
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async fetchRecentTDMS() {
      this.loading = true
      this.error = null
      try {
        const { data } = await axiosInstance.get('/tong-quan/recent')
        this.recentTDMS = data.data
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})
