// src/axios.js
import axios from 'axios'
import VueCookies from 'vue-cookies'
import { useAuthStore } from '@/stores/useAuthStore'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = VueCookies.get('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  async (error) => {
    const { response } = error
    if (response && response.status === 401) {
      if (response.data.error === 'UnauthorizedException') {
        const authStore = useAuthStore()
        authStore.logout()
        toast({
          title: 'Phiên đăng nhập đã hết hạn',
          description: 'Hãy đăng nhập lại vào hệ thống',
          variant: 'destructive'
        })
      }
    }
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const { response } = error
    if (response && response.status === 401) {
      if (response.data.error === 'UnauthorizedException') {
        const authStore = useAuthStore()
        authStore.logout()
        toast({
          title: 'Phiên đăng nhập đã hết hạn',
          description: 'Hãy đăng nhập lại vào hệ thống',
          variant: 'destructive'
        })
      }
    }
    return Promise.reject(error)
  }
)
export default axiosInstance
