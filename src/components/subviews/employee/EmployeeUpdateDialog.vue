<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Chỉnh sửa thông tin nhân viên</DialogTitle>
        <DialogDescription>
          Điền các thông tin cần thiết vào form bên dưới, ấn lưu để tiến hành lưu lại
        </DialogDescription>
      </DialogHeader>

      <Form :validation-schema="formSchema" @submit="onSubmit" :initial-values="formValues">
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <FormField v-slot="{ componentField }" name="HoTenNV">
              <FormItem>
                <FormLabel for="HoTenNV">Họ tên</FormLabel>
                <FormControl>
                  <Input id="HoTenNV" placeholder="Nguyễn Văn A" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <FormField v-slot="{ componentField }" name="ChucVu">
              <FormItem>
                <FormLabel for="ChucVu">Chức vụ</FormLabel>
                <FormControl>
                  <ComboboxWithCreate id="ChucVu" v-bind="componentField"></ComboboxWithCreate>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="SoDienThoai">
              <FormItem>
                <FormLabel for="SoDienThoai">Số điện thoại</FormLabel>
                <FormControl>
                  <Input id="SoDienThoai" placeholder="0123456789" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div class="grid grid-cols-1 gap-4">
            <FormField v-slot="{ componentField }" name="DiaChi">
              <FormItem>
                <FormLabel for="DiaChi">Địa chỉ</FormLabel>
                <FormControl>
                  <Input id="DiaChi" placeholder="432A Đường 30/4" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </div>
        <div class="flex flex-row w-full space-x-2 mt-6">
          <Button type="submit" class="w-full"> Cập nhật </Button>
          <Button variant="outline" @click="closeDialog" class="w-full">Hủy</Button>
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

import { useEmployeeStore } from '@/stores/useEmployeeStore'
import ComboboxWithCreate from './ComboboxWithCreate.vue'
import { useToast } from '@/components/ui/toast'

const { toast } = useToast()

const employeeStore = useEmployeeStore()

const dialogOpen = ref(false)

const formId = ref('')
const formValues = ref({
  HoTenNV: '',
  ChucVu: '',
  SoDienThoai: '',
  DiaChi: '',
  MaTaiKhoan: ''
})

const formSchema = toTypedSchema(
  z.object({
    HoTenNV: z.string().min(1, { message: 'Họ tên không được để trống' }),
    ChucVu: z.string().min(1, { message: 'Chức vụ không được để trống' }),
    DiaChi: z.string().optional(),
    SoDienThoai: z
      .string()
      .regex(/^\d{10}$/, 'Số điện thoại không hợp lệ')
      .optional()
  })
)

const openDialog = (employee) => {
  formId.value = employee.MSNV
  formValues.value.HoTenNV = employee.HoTenNV
  formValues.value.ChucVu = employee.ChucVu
  formValues.value.DiaChi = employee.DiaChi
  formValues.value.SoDienThoai = employee.SoDienThoai
  formValues.value.MaTaiKhoan = employee.TaiKhoan.MaTaiKhoan
  dialogOpen.value = true
}

const onSubmit = async (values) => {
  await employeeStore.updateEmployee(formId.value, values)
  toast({
    title: 'Cập nhật thông tin nhân viên',
    description: `Thông tin của nhân viên ${values.HoTenNV} đã được cập nhật thành công`
  })
  closeDialog()
}

const closeDialog = () => {
  dialogOpen.value = false
}

defineExpose({ openDialog })
</script>
