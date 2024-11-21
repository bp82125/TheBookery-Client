<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Đặt lại mật khẩu</DialogTitle>
        <DialogDescription>
          Nhập mật khẩu mới vào các ô bên dưới, sau đó nhấn lưu để thay đổi mật khẩu.
        </DialogDescription>
      </DialogHeader>

      <Form :validation-schema="formSchema" @submit="onSubmit">
        <div class="space-y-4">
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
          <Button type="submit" class="w-full"> Đặt lại </Button>
        </div>
      </Form>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
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

const { toast } = useToast()

const accountStore = useAccountStore()

const id = ref('')
const TenDangNhap = ref('')
const dialogOpen = ref(false)

const formSchema = toTypedSchema(
  z
    .object({
      newPassword: z
        .string()
        .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự!' })
        .max(50)
        .regex(/[a-z]/, { message: 'Mật khẩu phải có ít nhất một chữ thường!' })
        .regex(/[A-Z]/, { message: 'Mật khẩu phải có ít nhất một chữ hoa!' })
        .regex(/\d/, { message: 'Mật khẩu phải có ít nhất một số!' }),
      newPasswordConfirmation: z.string()
    })
    .refine((data) => data.newPassword === data.newPasswordConfirmation, {
      message: 'Mật khẩu không khớp',
      path: ['newPasswordConfirmation']
    })
)

const onSubmit = async (values) => {
  try {
    const payload = { newMatKhau: values.newPassword }
    await accountStore.resetPasswordAccount(id.value, payload)
    toast({
      title: 'Đặt lại mật khẩu',
      description: `Mật khẩu của tài khoản ${TenDangNhap.value} được đặt lại thành công`
    })
    closeDialog()
  } catch (error) {
    console.error('Error resetting password:', error)
  }
}

const closeDialog = () => {
  dialogOpen.value = false
}

const openDialog = (account) => {
  id.value = account.MaTaiKhoan
  TenDangNhap.value = account.TenDangNhap
  dialogOpen.value = true
}

defineExpose({ openDialog })
</script>
