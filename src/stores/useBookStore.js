// stores/useBookStore.js
import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'

export const useBookStore = defineStore('book', {
  state: () => ({
    books: [],
    book: null,
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
    paginationParams: { page: 1, limit: 10 }
  }),

  actions: {
    async fetchBooks() {
      this.loading = true
      this.error = null
      try {
        const params = {
          ...this.searchParams,
          ...this.sortParams,
          ...this.paginationParams
        }

        const { data } = await axiosInstance.get('/sach', { params })
        this.books = data.data.sachs
        this.pagination = data.data.pagination
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async fetchBookById(id) {
      this.loading = true
      this.error = null
      try {
        const { data } = await axiosInstance.get(`/sach/${id}`)
        this.book = data
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async createBook(book) {
      this.loading = true
      this.error = null
      try {
        await axiosInstance.post('/sach', book)
        await this.fetchBooks()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async updateBook(id, updatedBook) {
      this.loading = true
      this.error = null
      try {
        await axiosInstance.put(`/sach/${id}`, updatedBook)
        await this.fetchBooks()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async deleteBook(id) {
      this.loading = true
      this.error = null
      try {
        await axiosInstance.delete(`/sach/${id}`)
        await this.fetchBooks()
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
