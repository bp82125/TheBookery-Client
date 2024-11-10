// stores/useAuthStore.js
import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'
import VueCookies from 'vue-cookies'
import { useToast } from '@/components/ui/toast/use-toast'
import router from '@/router'

const { toast } = useToast()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    account: null,
    loading: false,
    error: null,
    token: null
  }),

  actions: {
    async login(username, password) {
      this.loading = true
      this.error = null

      try {
        const response = await axiosInstance.post(
          '/tai-khoan/login',
          {
            username,
            password
          },
          {
            auth: {
              username,
              password
            }
          }
        )

        if (response.data.success) {
          const { account, token } = response.data.data

          this.token = token
          this.account = account

          VueCookies.set('token', token)
          VueCookies.set('account', JSON.stringify(account))

          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
          toast({
            title: 'Đăng nhập thành công',
            description: 'Đăng nhập thành công vào hệ thống'
          })
          router.push('/dashboard/home')
        } else {
          toast({
            title: 'Đăng nhập thất bại',
            description: 'Đã xảy ra lỗi khi đăng nhập vào hệ thống. Hãy kiểm tra và thử lại.',
            variant: 'destructive'
          })
        }
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          'Đã xảy ra lỗi khi đăng nhập vào hệ thống. Hãy kiểm tra và thử lại.'
      } finally {
        this.loading = false
      }
    },

    logout() {
      router.push({ name: 'login' })

      VueCookies.remove('token')
      VueCookies.remove('account')

      this.account = null
      this.token = null

      delete axiosInstance.defaults.headers.common['Authorization']
    },

    fetchAccountInfos() {
      const token = VueCookies.get('token')
      const account = VueCookies.get('account')

      if (token && account) {
        this.token = token
        this.account = account
      } else if (router.currentRoute.value.meta.requireLogin) {
        router.push({ name: 'login' })
      }
    },
    getLoaiTaiKhoan() {
      return this.account?.LoaiTaiKhoan
    },
    getMaDocGIa() {
      return this.account?.DocGia?.MaDocGia
    }
  }
})
