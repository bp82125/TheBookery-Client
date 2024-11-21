// stores/useEmployeeStore.js
import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [],
    employee: null,
    positions: [],
    loading: false,
    error: null,

    pagination: {
      total_records: 0,
      current_page: 1,
      total_pages: 1,
      next_page: null,
      prev_page: null
    },

    searchParams: {},
    sortParams: {},
    paginationParams: { page: 1, limit: 5 }
  }),

  actions: {
    async fetchEmployees() {
      this.loading = true
      try {
        const params = {
          ...this.searchParams,
          ...this.sortParams,
          ...this.paginationParams
        }

        const response = await axiosInstance.get('/nhan-vien', { params })
        this.employees = response.data.data.nhanViens
        this.pagination = response.data.data.pagination
        this.positions = response.data.data.chucVus
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async fetchEmployeeById(id) {
      this.loading = true
      try {
        const response = await axiosInstance.get(`/nhan-vien/${id}`)
        this.employee = response.data
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async createEmployee(employee) {
      this.loading = true
      try {
        await axiosInstance.post('/nhan-vien', employee)
        await this.fetchEmployees()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async updateEmployee(id, updatedEmployee) {
      this.loading = true
      try {
        await axiosInstance.put(`/nhan-vien/${id}`, updatedEmployee)
        await this.fetchEmployees()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async deleteEmployee(id) {
      this.loading = true
      try {
        await axiosInstance.delete(`/nhan-vien/${id}`)
        await this.fetchEmployees()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    setSearchParams(field, value) {
      if (value) {
        this.searchParams[field] = value
        this.setCurrentPage(1)
      } else {
        delete this.searchParams[field]
      }
    },

    setSortParams(sortBy, order) {
      if (sortBy) {
        this.sortParams['sortBy'] = sortBy
        this.sortParams['order'] = order
      } else {
        delete this.sortParams['sortBy']
        delete this.sortParams['order']
      }
    },

    setPaginationParams(page, limit) {
      this.paginationParams.page = page
      this.paginationParams.limit = limit
    },
    setCurrentPage(page) {
      this.paginationParams.page = page
    },
    resetStates() {
      this.$reset()
    }
  }
})
