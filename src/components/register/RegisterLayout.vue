<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <Card class="w-full max-w-xl shadow-lg">
      <CardHeader>
        <CardTitle>Đăng ký tài khoản mới</CardTitle>
        <CardDescription>
          Điền các thông tin cần thiết vào form bên dưới qua từng bước, sau đó ấn nút để tiến hành
          thêm
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterReaderForm></RegisterReaderForm>
      </CardContent>
      <CardFooter class="flex justify-center">
        <p class="text-sm text-gray-600">
          Đã có tài khoản?
          <RouterLink to="/login" class="text-blue-600 hover:underline">Đăng nhập ngay</RouterLink>
        </p>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup>
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import RegisterReaderForm from './RegisterReaderForm.vue'
</script>
