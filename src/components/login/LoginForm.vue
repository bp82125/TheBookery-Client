<!-- LoginForm.vue -->
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
          required
        />
      </div>
      <Button type="submit" class="w-full" :disabled="isLoading">
        {{ isLoading ? 'Đăng nhập...' : 'Đăng nhập' }}
      </Button>
    </div>
    <div v-if="error" class="mt-4 text-red-500 text-sm text-center">
      {{ error }}
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import router from '@/router'

const username = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  if (!username.value || !password.value) {
    error.value = 'Please fill in all fields.'
    return
  }

  error.value = ''
  isLoading.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    alert('Login successful', { username: username.value, password: password.value })
    router.push('/dashboard')
  } catch (error) {
    error.value = 'Invalid username or password. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>
