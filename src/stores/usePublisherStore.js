// stores/nhaXuatBan.js
import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'

export const usePublisherStore = defineStore('publisher', {
  state: () => ({
    publishers: [],
    publisher: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchPublishers() {
      this.loading = true
      try {
        const response = await axiosInstance.get('/nha-xuat-ban')
        this.publishers = response.data.data.nhaXuatBans
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
        this.publisher = response.data
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async createPublisher(publisher) {
      this.loading = true
      try {
        const response = await axiosInstance.post('/nha-xuat-ban', publisher)
        this.publishers.push(response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async updatePublisher(id, updatedPublisher) {
      this.loading = true
      try {
        const response = await axiosInstance.put(`/nha-xuat-ban/${id}`, updatedPublisher)
        const index = this.publishers.findIndex((p) => p.MaNXB === id)
        if (index !== -1) {
          this.publishers[index] = response.data
        }
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
        this.publishers = this.publishers.filter((p) => p.MaNXB !== id)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})
