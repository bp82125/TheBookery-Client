// stores/useAccountStore.js
import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'

export const useAccountStore = defineStore('account', {
  state: () => ({
    accounts: [],
    account: null,
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
    async fetchAccounts() {
      this.loading = true
      this.error = null // Reset error at the start
      try {
        const params = {
          ...this.searchParams,
          ...this.sortParams,
          ...this.paginationParams
        }

        const response = await axiosInstance.get('/tai-khoan', { params })
        const data = response.data.data
        this.accounts = data.taiKhoans
        this.pagination = data.pagination
      } catch (error) {
        this.error = error.message || 'An error occurred while fetching accounts'
      } finally {
        this.loading = false
      }
    },

    async fetchAccountById(id) {
      this.loading = true
      this.error = null
      try {
        const response = await axiosInstance.get(`/tai-khoan/${id}`)
        this.account = response.data
      } catch (error) {
        this.error = error.message || 'Failed to fetch account details'
      } finally {
        this.loading = false
      }
    },

    async createAccount(account) {
      this.loading = true
      this.error = null
      try {
        const response = await axiosInstance.post('/tai-khoan', account)
        console.log(response)
        const createdAccount = response.data.data
        await this.fetchAccounts()
        return createdAccount
      } catch (error) {
        this.error = error.message || 'Failed to create account'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateAccount(id, updatedAccount) {
      this.loading = true
      this.error = null
      try {
        await axiosInstance.put(`/tai-khoan/${id}`, updatedAccount)
        await this.fetchAccounts()
      } catch (error) {
        this.error = error.message || 'Failed to update account'
      } finally {
        this.loading = false
      }
    },

    async toggleAccount(id) {
      this.loading = true
      this.error = null
      try {
        await axiosInstance.patch(`/tai-khoan/${id}/toggle`)
        await this.fetchAccounts()
      } catch (error) {
        this.error = error.message || 'Failed to toggle account'
      } finally {
        this.loading = false
      }
    },

    async resetPasswordAccount(id, newPassword) {
      this.loading = true
      this.error = null
      try {
        await axiosInstance.patch(`/tai-khoan/${id}/reset-password`, newPassword)
        await this.fetchAccounts()
      } catch (error) {
        this.error = error.message || 'Failed to reset account password'
      } finally {
        this.loading = false
      }
    },

    async deleteAccount(id) {
      this.loading = true
      this.error = null
      try {
        await axiosInstance.delete(`/tai-khoan/${id}`)
        await this.fetchAccounts()
      } catch (error) {
        this.error = error.message || 'Failed to delete account'
      } finally {
        this.loading = false
      }
    },

    setSearchParams(field, value) {
      if (value) {
        this.searchParams = { [field]: value }
      } else {
        delete this.searchParams[field]
      }
    },
    setSortParams(sortBy, order) {
      if (sortBy) {
        this.sortParams = { sortBy, order }
      } else {
        this.sortParams = {}
      }
    },
    setPaginationParams(page, limit) {
      this.paginationParams.page = page
      this.paginationParams.limit = limit
    }
  }
})
