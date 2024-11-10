// stores/useAuthStore.js
import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'
import VueCookies from 'vue-cookies'
import { useToast } from '@/components/ui/toast/use-toast'
import router from '@/router'

const { toast } = useToast()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
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
          const { user, token } = response.data.data

          this.token = token
          this.user = user

          VueCookies.set('token', token)
          VueCookies.set('user', JSON.stringify(user))

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
        this.error = error.response?.data?.message || 'Failed to login'
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      this.token = null

      VueCookies.remove('token')
      VueCookies.remove('user')

      delete axiosInstance.defaults.headers.common['Authorization']
      router.push('/login')
    },

    loadUserFromCookies() {
      const token = VueCookies.get('token')
      const user = VueCookies.get('user')

      if (token && user) {
        this.token = token
        this.user = JSON.parse(user)
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    }
  }
})
