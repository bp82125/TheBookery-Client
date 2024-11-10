// src/axios.js
import axios from 'axios'
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
    return config
  },
  (error) => {
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
          title: 'Đăng xuất thành công',
          description: 'Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại',
          variant: 'destructive'
        })
      }
    }
    return Promise.reject(error)
  }
)
export default axiosInstance
