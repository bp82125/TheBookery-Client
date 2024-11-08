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
    </Card>
  </div>
</template>

<script setup>
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import RegisterReaderForm from './RegisterReaderForm.vue'
</script>
