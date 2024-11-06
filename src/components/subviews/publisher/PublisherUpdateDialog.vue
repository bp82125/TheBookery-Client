<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Chỉnh sửa thông tin nhà xuất bản</DialogTitle>
        <DialogDescription>
          Điền các thông tin cần thiết vào form bên dưới, ấn lưu để tiến hành lưu lại
        </DialogDescription>
      </DialogHeader>
      <Form :validation-schema="formSchema" @submit="onSubmit" :initial-values="formValues">
        <FormField v-slot="{ componentField }" name="TenNXB">
          <FormItem>
            <FormLabel>Tên nhà xuất bản</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Nhà xuất bản A..." v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="DiaChi">
          <FormItem class="mt-3">
            <FormLabel>Địa chỉ</FormLabel>
            <FormControl>
              <Input type="text" placeholder="464 Khu vực Thạnh Bình..." v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex flex-row w-full space-x-2 mt-6">
          <Button type="submit" class="w-full"> Cập nhật </Button>
          <Button variant="outline" @click="closeDialog" class="w-full">Hủy</Button>
        </div>
      </Form>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { usePublisherStore } from '@/stores/usePublisherStore'
import { useToast } from '@/components/ui/toast'

const publisherStore = usePublisherStore()

const { toast } = useToast()

const formSchema = toTypedSchema(
  z.object({
    TenNXB: z
      .string()
      .min(1, { message: 'Tên nhà xuất bản là bắt buộc.' })
      .max(50, { message: 'Tên nhà xuất bản không được quá 50 ký tự.' }),
    DiaChi: z
      .string()
      .min(1, { message: 'Địa chỉ là bắt buộc.' })
      .max(200, { message: 'Địa chỉ không được quá 200 ký tự.' })
  })
)

const dialogOpen = ref(false)

const formId = ref('')
const formValues = ref({
  TenNXB: '',
  DiaChi: ''
})

const openDialog = (publisher) => {
  formId.value = publisher.MaNXB
  formValues.value.TenNXB = publisher.TenNXB
  formValues.value.DiaChi = publisher.DiaChi
  dialogOpen.value = true
}

const onSubmit = async (values) => {
  await publisherStore.updatePublisher(formId.value, values)
  toast({
    title: 'Cập nhật nhà xuất bản',
    description: `${values.TenNXB} được cập nhật thành công`
  })
  closeDialog()
}

const closeDialog = () => {
  dialogOpen.value = false
}

defineExpose({ openDialog })
</script>
