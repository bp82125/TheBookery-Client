<template>
  <Dialog v-model:open="dialogOpen" @update:open="handleDialogUpdate">
    <template v-if="LoaiTaiKhoan !== 'USER'">
      <DialogTrigger as-child>
        <Button class="inline-flex items-center bg-blue-600 hover:bg-blue-500" @click="openDialog">
          <Plus class="size-4 mr-2"></Plus>
          <span>Thêm sách mới</span>
        </Button>
      </DialogTrigger>
    </template>

    <DialogContent class="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Thêm sách mới</DialogTitle>
        <DialogDescription>
          Điền các thông tin cần thiết vào form bên dưới, sau đó ấn nút để thêm sách.
        </DialogDescription>
      </DialogHeader>
      <Form
        :validation-schema="formSchema"
        @submit="onSubmit"
        :initial-values="formValues"
        v-slot="{ setFieldValue }"
        :keep-values="false"
      >
        <FormField v-slot="{ componentField }" name="TenSach">
          <FormItem>
            <FormLabel>Tên sách</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Tên sách..." v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="grid grid-cols-2 gap-x-2 items-center">
          <FormField v-slot="{ value }" name="DonGia">
            <FormItem class="mt-3">
              <FormLabel>Đơn giá</FormLabel>
              <NumberField
                class="gap-2"
                :min="1000"
                :step="1000"
                :format-options="{
                  style: 'currency',
                  currency: 'VND',
                  currencyDisplay: 'code',
                  currencySign: 'accounting'
                }"
                :model-value="value"
                @update:model-value="
                  (v) => {
                    if (v) {
                      setFieldValue('DonGia', v)
                    } else {
                      setFieldValue('DonGia', 1000)
                    }
                  }
                "
              >
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <FormControl>
                    <NumberFieldInput />
                  </FormControl>
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ value }" name="SoQuyen">
            <FormItem class="mt-3">
              <FormLabel>Số quyển</FormLabel>
              <NumberField
                class="gap-2"
                :min="1"
                :model-value="value"
                @update:model-value="
                  (v) => {
                    if (v) {
                      setFieldValue('SoQuyen', v)
                    } else {
                      setFieldValue('SoQuyen', 1)
                    }
                  }
                "
              >
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <FormControl>
                    <NumberFieldInput />
                  </FormControl>
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <div class="grid grid-cols-2 gap-x-2 items-center">
          <FormField v-slot="{ componentField }" name="NamXuatBan">
            <FormItem class="mt-3">
              <FormLabel>Năm xuất bản</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Năm xuất bản" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="NguonGoc">
            <FormItem class="mt-3">
              <FormLabel>Nguồn gốc</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Xuất xứ của sách..." v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <FormField v-slot="{ value }" name="MaNXB">
          <FormItem class="mt-3">
            <FormLabel>Nhà xuất bản</FormLabel>
            <FormControl>
              <Popover v-model:open="open">
                <PopoverTrigger as-child>
                  <Button
                    variant="outline"
                    class="w-full justify-between font-normal"
                    role="combobox"
                    :aria-expanded="open"
                  >
                    {{ selectedTenNXB ? selectedTenNXB : 'Chọn nhà xuất bản' }}
                    <ChevronsUpDown class="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Tìm kiếm nhà xuất bản..."
                      v-model="searchTerm"
                      @input="debouncedSearch"
                    />
                    <CommandEmpty> Không tìm thấy kết quả </CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        <CommandItem
                          v-for="publisher in publishers"
                          :key="publisher.MaNXB"
                          :value="publisher"
                          @select="
                            () => {
                              setFieldValue('MaNXB', publisher.MaNXB)
                              selectedTenNXB = publisher.TenNXB
                              open = false
                            }
                          "
                        >
                          <Check
                            :class="
                              cn(
                                'mr-2 h-4 w-4',
                                value === publisher.MaNXB ? 'opacity-100' : 'opacity-0'
                              )
                            "
                          />
                          {{ publisher.TenNXB }}
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ field, errorMessage }" name="HinhAnh">
          <FormItem class="mt-3">
            <FormLabel>Hình ảnh</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                @change="(event) => handleImageChange(event, setFieldValue)"
              />
            </FormControl>
            <FormMessage>{{ errorMessage }}</FormMessage>
          </FormItem>
        </FormField>

        <div class="flex flex-row w-full space-x-2 mt-6">
          <Button type="submit" class="w-full" :disabled="isSubmitting">
            {{ isSubmitting ? 'Đang xử lý...' : 'Thêm' }}
          </Button>
          <Button variant="outline" @click="closeDialog" class="w-full">Hủy</Button>
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

import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput
} from '@/components/ui/number-field'

import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup
} from '@/components/ui/command'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

import { Input } from '@/components/ui/input'
import { Plus, Check, ChevronsUpDown } from 'lucide-vue-next'

import { computed, ref, onMounted, nextTick } from 'vue'
import { useBookStore } from '@/stores/useBookStore'
import { usePublisherStore } from '@/stores/usePublisherStore'
import { useToast } from '@/components/ui/toast'
import { uploadImage } from '@/plugins/cloudinary'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/useAuthStore'

const { toast } = useToast()
const bookStore = useBookStore()
const publisherStore = usePublisherStore()
const authStore = useAuthStore()

const LoaiTaiKhoan = computed(() => {
  return authStore.getLoaiTaiKhoan()
})

onMounted(async () => {
  await publisherStore.fetchPublishers()
})

const publishers = computed(() => {
  return publisherStore.publishers
})

const searchTerm = ref('')
const selectedTenNXB = ref('')
const open = ref(false)
const dialogOpen = ref(false)
const isSubmitting = ref(false)
const selectedImage = ref('')
const currentYear = new Date().getFullYear()

function debounce(func, delay) {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

const debouncedSearch = debounce(async () => {
  publisherStore.setSearchParams('TenNXB', searchTerm.value)
  await publisherStore.fetchPublishers()
}, 300)

const formValues = ref({
  TenSach: '',
  DonGia: 1000,
  SoQuyen: 1,
  NamXuatBan: currentYear,
  NguonGoc: '',
  MaNXB: '',
  HinhAnh: ''
})

const formSchema = toTypedSchema(
  z.object({
    TenSach: z
      .string()
      .min(1, { message: 'Tên sách là bắt buộc.' })
      .max(100, { message: 'Tên sách không được quá 100 ký tự.' }),
    DonGia: z.number().min(1000, { message: 'Đơn giá phải lớn hơn 1000.' }),
    SoQuyen: z.number().min(1, { message: 'Số quyển phải lớn hơn 0.' }),
    NamXuatBan: z
      .number()
      .int()
      .min(1800, { message: 'Năm xuất bản không hợp lệ.' })
      .max(new Date().getFullYear(), { message: 'Năm xuất bản không thể lớn hơn năm hiện tại.' }),
    NguonGoc: z.string().max(50, { message: 'Nguồn gốc không được quá 50 ký tự.' }),
    MaNXB: z.string().max(100, { message: 'Mã nhà xuất bản là bắt buộc.' }),
    HinhAnh: z
      .any()
      .refine((file) => file instanceof File, {
        message: 'Vui lòng chọn một tệp hình ảnh.'
      })
      .refine((file) => file instanceof File && file.size <= 5000000, {
        message: 'Hình ảnh phải có dung lượng nhỏ hơn 5MB.'
      })
      .optional()
  })
)

const handleImageChange = (event, setFieldValue) => {
  const file = event.target.files[0]
  if (file) {
    setFieldValue('HinhAnh', file)
    selectedImage.value = file
  }
}

const onSubmit = async (values) => {
  isSubmitting.value = true
  try {
    let imageUrl = ''
    if (values.HinhAnh) {
      imageUrl = await uploadImage(values.HinhAnh)
    }

    const submitData = {
      ...values,
      HinhAnh: imageUrl
    }

    await bookStore.createBook(submitData)

    toast({
      title: 'Sách đã được thêm thành công',
      description: `Thông tin của sách ${values.TenSach} đã được lưu vào hệ thống.`
    })

    closeDialog()
  } catch (error) {
    console.error('Error submitting form:', error)
    toast({
      title: 'Có lỗi xảy ra',
      description: 'Không thể thêm sách. Vui lòng thử lại.',
      variant: 'destructive'
    })
  } finally {
    isSubmitting.value = false
  }
}

const openDialog = () => {
  dialogOpen.value = true
}

const closeDialog = () => {
  dialogOpen.value = false
  nextTick(() => {
    searchTerm.value = ''
    selectedTenNXB.value = ''
    selectedImage.value = null
  })
}

const handleDialogUpdate = (isOpen) => {
  if (!isOpen) {
    closeDialog()
  }
}
</script>
