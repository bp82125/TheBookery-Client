<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-4">
      <div class="space-y-2">
        <Label for="username">Tên đăng nhập</Label>
        <Input
          id="username"
          v-model="username"
          type="text"
          placeholder="Nhập tên đăng nhập của bạn"
          required
        />
      </div>
      <div class="space-y-2">
        <Label for="password">Mật khẩu</Label>
        <Input
          id="password"
          v-model="password"
          type="password"
          placeholder="Nhập mật khẩu của bạn"
          autocomplete
          required
        />
      </div>
      <Button type="submit" class="w-full" :disabled="isLoading">
        {{ isLoading ? 'Đăng nhập...' : 'Đăng nhập' }}
      </Button>
    </div>
    <div v-if="error" class="mt-4 text-red-500 text-sm">
      {{ error }}
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/useAuthStore'

const username = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref('')

const authStore = useAuthStore()

const handleSubmit = async () => {
  error.value = ''
  if (!username.value || !password.value) {
    error.value = 'Please fill in all fields.'
    return
  }

  error.value = ''
  isLoading.value = true

  setTimeout(() => {}, 1000)
  await authStore.login(username.value, password.value)

  error.value = authStore.error
  isLoading.value = false
}
</script>
