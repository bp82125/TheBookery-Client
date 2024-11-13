<template>
  <div class="min-h-screen flex flex-grow items-center justify-center bg-[url('/background.jpg')]">
    <div class="rounded-lg bg-white p-8 text-center shadow-xl mx-10">
      <img src="/NotFound.png" class="md:h-64 object-scale-down" alt="" />
      <p class="text-gray-600">Oops! Không thể truy cập trang bạn muốn chuyển hướng đến.</p>

      <RouterLink :to="redirectPath">
        <Button class="bg-blue-500 hover:bg-blue-700 mt-3 w-full">Quay lại trang chủ</Button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui/button'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()

const redirectPath = computed(() => {
  const { account } = authStore
  const requiredRoles = ['USER', 'ADMINISTRATOR', 'EMPLOYEE']

  return account && requiredRoles.includes(account.LoaiTaiKhoan) ? '/dashboard/home' : '/login'
})
</script>
