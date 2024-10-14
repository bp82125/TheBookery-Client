<!-- LoginCard.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <Card class="w-full max-w-md shadow-lg">
      <CardHeader>
        <div class="flex justify-center">
          <img src="/favicon.ico" alt="Logo" class="h-20 w-20" />
        </div>
        <CardTitle class="text-2xl font-bold text-center">Đăng nhập</CardTitle>
        <CardDescription class="text-center">
          Hãy nhập tên đăng nhập và mật khẩu để vào hệ thống
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter class="flex justify-center">
        <p class="text-sm text-gray-600">
          Chưa có mật khẩu?
          <RouterLink to="/register" class="text-blue-600 hover:underline"
            >Đăng ký tài khoản ngay</RouterLink
          >
        </p>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import LoginForm from './LoginForm.vue'
</script>
