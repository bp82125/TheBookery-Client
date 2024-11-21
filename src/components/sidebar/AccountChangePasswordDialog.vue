<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Đổi mật khẩu</DialogTitle>
        <DialogDescription>
          Nhập mật khẩu cũ và mật khẩu mới vào các ô bên dưới, sau đó nhấn lưu để thay đổi mật khẩu.
        </DialogDescription>
      </DialogHeader>

      <Form :validation-schema="formSchema" @submit="onSubmit">
        <div class="space-y-4">
          <FormField v-slot="{ componentField }" name="oldPassword">
            <FormItem>
              <FormLabel for="oldPassword">Mật khẩu cũ</FormLabel>
              <FormControl>
                <Input
                  id="oldPassword"
                  type="password"
                  placeholder="Mật khẩu cũ"
                  v-bind="componentField"
                  autocomplete
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="newPassword">
            <FormItem>
              <FormLabel for="newPassword">Mật khẩu mới</FormLabel>
              <FormControl>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Mật khẩu mới"
                  v-bind="componentField"
                  autocomplete
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="newPasswordConfirmation">
            <FormItem>
              <FormLabel for="newPasswordConfirmation">Nhập lại mật khẩu mới</FormLabel>
              <FormControl>
                <Input
                  id="newPasswordConfirmation"
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  v-bind="componentField"
                  autocomplete
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="flex flex-row w-full space-x-2 mt-6">
          <Button variant="outline" @click="closeDialog" class="w-full">Hủy</Button>
          <Button type="submit" class="w-full"> Thay đổi </Button>
        </div>
      </Form>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { computed, ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useAccountStore } from '@/stores/useAccountStore'
import { useToast } from '@/components/ui/toast/use-toast'
import { useAuthStore } from '@/stores/useAuthStore'

const { toast } = useToast()

const accountStore = useAccountStore()
const authStore = useAuthStore()

const id = computed(() => {
  return authStore.account.MaTaiKhoan
})
const dialogOpen = ref(false)

const formSchema = toTypedSchema(
  z
    .object({
      oldPassword: z.string().min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự!' }).max(50),
      newPassword: z
        .string()
        .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự!' })
        .max(50)
        .regex(/[a-z]/, { message: 'Mật khẩu phải có ít nhất một chữ thường!' })
        .regex(/[A-Z]/, { message: 'Mật khẩu phải có ít nhất một chữ hoa!' })
        .regex(/\d/, { message: 'Mật khẩu phải có ít nhất một số!' }),
      newPasswordConfirmation: z.string()
    })
    .refine((data) => data.newPassword !== data.oldPassword, {
      message: 'Mật khẩu mới phải khác mật khẩu cũ!',
      path: ['newPassword']
    })
    .refine((data) => data.newPassword === data.newPasswordConfirmation, {
      message: 'Mật khẩu không khớp',
      path: ['newPasswordConfirmation']
    })
)

const onSubmit = async (values) => {
  const payload = {
    oldMatKhau: values.oldPassword,
    newMatKhau: values.newPassword
  }
  const response = await accountStore.changePasswordAccount(id.value, payload)

  if (response.data.success) {
    toast({
      title: 'Thay đổi mật khẩu',
      description: `Mật khẩu đã được thay đổi thành công. Hãy đăng nhập lại vào hệ thống`
    })
    authStore.logout()
    closeDialog()
  } else {
    toast({
      title: 'Thay đổi mật khẩu thất bại',
      description: response.data.message,
      variant: 'destructive'
    })
  }
}

const closeDialog = () => {
  dialogOpen.value = false
}

const openDialog = () => {
  dialogOpen.value = true
}

defineExpose({ openDialog })
</script>
