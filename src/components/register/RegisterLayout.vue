<template>
  <div class="min-h-screen bg-background flex items-center justify-center p-4">
    <Card class="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Đăng ký tài khoản mới</CardTitle>
        <CardDescription>
          {{
            currentForm === 'basic'
              ? 'Bước 1: Thông tin cá nhân cơ bản'
              : 'Bước 2: Chi tiết tài khoản'
          }}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-2 mb-4">
          <Progress :value="currentForm === 'basic' ? 50 : 100" class="w-full" />
        </div>

        <form @submit.prevent="submitForm">
          <RegisterInfoForm
            v-if="currentForm === 'basic'"
            v-model:basicInfo="registrationStore.basicInfo"
          />
          <RegisterAccountForm v-else v-model:accountInfo="registrationStore.accountInfo" />

          <div class="flex justify-between mt-6">
            <Button
              v-if="currentForm === 'account'"
              @click="switchForm('basic')"
              variant="outline"
              type="button"
            >
              Back
            </Button>
            <Button v-if="currentForm === 'basic'" @click="switchForm('account')" type="button">
              Next
            </Button>
            <Button v-if="currentForm === 'account'" type="submit"> Register </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRegistrationStore } from '@/stores/useRegistrationStore'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import RegisterInfoForm from './RegisterInfoForm.vue'
import RegisterAccountForm from './RegisterAccountForm.vue'

const currentForm = ref('basic')
const registrationStore = useRegistrationStore()

const switchForm = (form) => {
  currentForm.value = form
}

const submitForm = () => {
  const formData = {
    ...registrationStore.basicInfo,
    ...registrationStore.accountInfo
  }
  console.log('Form submitted:', formData)
}
</script>
