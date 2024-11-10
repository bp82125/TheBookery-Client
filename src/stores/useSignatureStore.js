// stores/useSignatureStore.js
import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'

export const useSignatureStore = defineStore('signature', {
  state: () => ({
    signature: null,
    timestamp: null,
    api_key: null,
    cloudName: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchSignature(publicId) {
      this.loading = true
      this.error = null

      try {
        const response = await axiosInstance.get('/cloudinary/signature', {
          params: { public_id: publicId }
        })

        const { signature, timestamp, apiKey, cloudName } = response.data.data
        this.signature = signature
        this.timestamp = timestamp
        this.api_key = apiKey
        this.cloudName = cloudName
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch signature'
      } finally {
        this.loading = false
      }
    },

    resetSignature() {
      this.signature = null
      this.timestamp = null
      this.api_key = null
      this.cloudName = null
      this.error = null
    },
    resetStates() {
      this.$reset()
    }
  }
})
