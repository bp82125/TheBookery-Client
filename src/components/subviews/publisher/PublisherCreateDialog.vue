<template>
  <Dialog v-model:open="dialogOpen">
    <DialogTrigger as-child>
      <Button class="inline-flex items-center bg-blue-600 hover:bg-blue-500">
        <Plus class="size-4 mr-2"></Plus> <span> Thêm nhà xuất bản </span>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Thêm nhà xuất bản mới</DialogTitle>
        <DialogDescription>
          Điền các thông tin cần thiết vào form bên dưới, sau đó ấn nút để tiến hành thêm
        </DialogDescription>
      </DialogHeader>
      <Form :validation-schema="formSchema" @submit="onSubmit">
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
              <Input
                type="text"
                placeholder="464 Khu vực Thạnh Bình..."
                v-model="initialValue"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex flex-row w-full space-x-2 mt-6">
          <Button variant="outline" @click="closeDialog" class="w-full">Hủy</Button>
          <Button type="submit" class="w-full"> Thêm </Button>
        </div>
      </Form>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

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
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-vue-next'

import { ref } from 'vue'
import { usePublisherStore } from '@/stores/usePublisherStore'
import { useToast } from '@/components/ui/toast'

const { toast } = useToast()

const publisherStore = usePublisherStore()

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

const onSubmit = async (values) => {
  await publisherStore.createPublisher(values)
  toast({
    title: 'Thêm nhà xuất bản',
    description: `${values.TenNXB} được thêm thành công`
  })
  closeDialog()
}

const dialogOpen = ref(false)

const closeDialog = () => {
  dialogOpen.value = false
}

const initialValue = ref('')
</script>
