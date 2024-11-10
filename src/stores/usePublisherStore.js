// stores/usePublisherStore.js
import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'

export const usePublisherStore = defineStore('publisher', {
  state: () => ({
    publishers: [],
    publisher: null,
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
    async fetchPublishers() {
      this.loading = true
      try {
        const params = {
          ...this.searchParams,
          ...this.sortParams,
          ...this.paginationParams
        }

        const response = await axiosInstance.get('/nha-xuat-ban', { params })
        this.publishers = response.data.data.nhaXuatBans
        this.pagination = response.data.data.pagination
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async fetchPublisherById(id) {
      this.loading = true
      try {
        const response = await axiosInstance.get(`/nha-xuat-ban/${id}`)
        this.publisher = response.data.data
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async createPublisher(publisher) {
      this.loading = true
      try {
        await axiosInstance.post('/nha-xuat-ban', publisher)
        await this.fetchPublishers()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async updatePublisher(id, updatedPublisher) {
      this.loading = true
      try {
        await axiosInstance.put(`/nha-xuat-ban/${id}`, updatedPublisher)
        await this.fetchPublishers()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async deletePublisher(id) {
      this.loading = true
      try {
        await axiosInstance.delete(`/nha-xuat-ban/${id}`)
        await this.fetchPublishers()
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
