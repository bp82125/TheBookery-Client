// stores/useReaderStore.js
import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'

export const useReaderStore = defineStore('reader', {
  state: () => ({
    readers: [],
    reader: null,
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
    async fetchReaders() {
      this.loading = true
      try {
        const params = {
          ...this.searchParams,
          ...this.sortParams,
          ...this.paginationParams
        }

        const response = await axiosInstance.get('/doc-gia', { params })
        this.readers = response.data.data.docGias
        this.pagination = response.data.data.pagination
      } catch (error) {
        this.error = error
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    async fetchReaderById(id) {
      this.loading = true
      try {
        const response = await axiosInstance.get(`/doc-gia/${id}`)
        this.reader = response.data
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async createReader(reader) {
      this.loading = true
      try {
        await axiosInstance.post('/doc-gia', reader)
        await this.fetchReaders()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async updateReader(id, updatedReader) {
      this.loading = true
      try {
        await axiosInstance.put(`/doc-gia/${id}`, updatedReader)
        await this.fetchReaders()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async deleteReader(id) {
      this.loading = true
      try {
        await axiosInstance.delete(`/doc-gia/${id}`)
        await this.fetchReaders()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    setSearchParams(field, value) {
      if (value) {
        this.searchParams[field] = value
      } else {
        delete this.searchParams[field]
      }
    },
    setSortParams(sortBy, order) {
      if (sortBy) {
        this.searchParams['sortBy'] = sortBy
        this.searchParams['order'] = order
      } else {
        delete this.searchParams['sortBy']
        delete this.searchParams['order']
      }
    },

    setPaginationParams(page, limit) {
      this.paginationParams.page = page
      this.paginationParams.limit = limit
    },
    resetStates() {
      this.$reset()
    }
  }
})
