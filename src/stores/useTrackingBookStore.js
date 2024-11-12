// stores/useTrackingStore.js
import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'

export const useTrackingBookStore = defineStore('tracking', {
  state: () => ({
    trackingBooks: [],
    trackingBook: null,
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
    sortParams: { order: 'desc' },
    paginationParams: { page: 1, limit: 5 },

    stateInfos: {
      ALL: {
        name: 'TrangThaiMuonSach',
        label: 'Trạng thái mượn sách'
      },
      PENDING: {
        name: 'NgayYeuCau',
        label: 'Ngày yêu cầu'
      },
      APPROVED: {
        name: 'NgayDuyet',
        label: 'Ngày xác nhận'
      },
      REJECTED: {
        name: 'NgayDuyet',
        label: 'Ngày từ chối'
      },
      PICKED_UP: {
        name: 'NgayMuon',
        label: 'Ngày lấy sách'
      },
      RETURNED: {
        name: 'NgayMuon',
        label: 'Ngày trả sách'
      }
    }
  }),

  actions: {
    async fetchTrackingBooks() {
      this.loading = true
      this.error = null
      try {
        const params = {
          ...this.searchParams,
          ...this.sortParams,
          ...this.paginationParams
        }

        const response = await axiosInstance.get('/theo-doi-muon-sach', { params })

        this.trackingBooks = response.data.data.TDMSs
        this.pagination = response.data.data.pagination
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async fetchTrackingBookById(id) {
      this.loading = true
      this.error = null
      try {
        const response = await axiosInstance.get(`/theo-doi-muon-sach/${id}`)
        this.trackingBook = response.data.data
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async createTrackingBook(MaDocGia, MaSach) {
      this.loading = true
      this.error = null
      try {
        const payload = { MaDocGia, MaSach }
        const response = await axiosInstance.post('/theo-doi-muon-sach', payload)
        await this.fetchTrackingBooks()
        return response
      } catch (error) {
        this.error = error
        return error.response
      } finally {
        this.loading = false
      }
    },

    async approveOrRejectTrackingBook(id, TrangThaiMuonSach) {
      this.loading = true
      this.error = null
      try {
        const payload = { TrangThaiMuonSach }
        const response = await axiosInstance.patch(`/theo-doi-muon-sach/${id}/duyet`, payload)
        await this.fetchTrackingBooks()
        return response
      } catch (error) {
        this.error = error
        return error.response
      } finally {
        this.loading = false
      }
    },

    async pickUpBook(id, NgayTraDuKien) {
      this.loading = true
      this.error = null
      try {
        const payload = { NgayTraDuKien: new Date(NgayTraDuKien) }
        await axiosInstance.patch(`/theo-doi-muon-sach/${id}/lay-sach`, payload)
        await this.fetchTrackingBooks()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async returnBook(id) {
      this.loading = true
      this.error = null
      try {
        await axiosInstance.patch(`/theo-doi-muon-sach/${id}/tra-sach`)
        await this.fetchTrackingBooks()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async deleteTrackingBook(id) {
      this.loading = true
      this.error = null
      try {
        await axiosInstance.delete(`/theo-doi-muon-sach/${id}`)
        await this.fetchTrackingBooks()
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

    getCurrentState() {
      return this.searchParams['TrangThaiMuonSach']
    },

    getCurrentStateInfo() {
      return this.stateInfos[this.getCurrentState()]
    },
    resetStates() {
      this.$reset()
    }
  }
})
