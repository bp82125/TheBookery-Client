<template>
  <Dialog v-model:open="dialogOpen" @update:open="handleDialogUpdate">
    <DialogTrigger as-child>
      <Button class="inline-flex items-center bg-blue-600 hover:bg-blue-500" @click="openDialog">
        <Plus class="size-4 mr-2" />
        <span>Thêm yêu cầu mượn sách</span>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Thêm yêu cầu mượn sách</DialogTitle>
        <DialogDescription> Chọn đọc giả và sách để tạo một đơn mượn sách mới. </DialogDescription>
      </DialogHeader>
      <Form
        :validation-schema="formSchema"
        @submit="onSubmit"
        :initial-values="formValues"
        v-slot="{ setFieldValue }"
        :keep-values="false"
      >
        <FormField v-slot="{ value }" name="MaDocGia">
          <FormItem class="mt-3">
            <FormLabel>Đọc giả</FormLabel>
            <FormControl>
              <Popover v-model:open="readerOpen">
                <PopoverTrigger as-child>
                  <Button
                    variant="outline"
                    class="w-full justify-between font-normal"
                    role="combobox"
                    :aria-expanded="readerOpen"
                  >
                    {{ selectedReaderName ? selectedReaderName : 'Chọn đọc giả' }}
                    <ChevronsUpDown class="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-[300px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Tìm kiếm độc giả..."
                      v-model="readerSearchTerm"
                      @input="debouncedReaderSearch"
                    />
                    <CommandEmpty>Không tìm thấy kết quả</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        <CommandItem
                          v-for="reader in readers"
                          :key="reader.MaDocGia"
                          :value="reader"
                          @select="
                            () => {
                              setFieldValue('MaDocGia', reader.MaDocGia)
                              selectedReaderName = reader.HoTen
                              readerOpen = false
                            }
                          "
                        >
                          <Check
                            :class="
                              cn(
                                'mr-2 h-4 w-4',
                                value === reader.MaDocGia ? 'opacity-100' : 'opacity-0'
                              )
                            "
                          />
                          {{ reader.HoTen }}
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

        <FormField v-slot="{ value }" name="MaSach">
          <FormItem class="mt-3">
            <FormLabel>Sách</FormLabel>
            <FormControl>
              <Popover v-model:open="bookOpen">
                <PopoverTrigger as-child>
                  <Button
                    variant="outline"
                    class="w-full justify-between font-normal"
                    role="combobox"
                    :aria-expanded="bookOpen"
                  >
                    {{ selectedBookTitle ? selectedBookTitle : 'Chọn sách' }}
                    <ChevronsUpDown class="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-[300px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Tìm kiếm sách..."
                      v-model="bookSearchTerm"
                      @input="debouncedBookSearch"
                    />
                    <CommandEmpty>Không tìm thấy kết quả</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        <CommandItem
                          v-for="book in books"
                          :key="book.MaSach"
                          :value="book"
                          @select="
                            () => {
                              setFieldValue('MaSach', book.MaSach)
                              selectedBookTitle = book.TenSach
                              bookOpen = false
                            }
                          "
                        >
                          <Check
                            :class="
                              cn(
                                'mr-2 h-4 w-4',
                                value === book.MaSach ? 'opacity-100' : 'opacity-0'
                              )
                            "
                          />
                          {{ book.TenSach }}
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

        <div class="flex flex-row w-full space-x-2 mt-6">
          <Button variant="outline" @click="closeDialog" class="w-full">Hủy</Button>
          <Button type="submit" class="w-full" :disabled="isSubmitting">
            {{ isSubmitting ? 'Đang xử lý...' : 'Thêm' }}
          </Button>
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
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup
} from '@/components/ui/command'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

import { Plus, Check, ChevronsUpDown } from 'lucide-vue-next'

import { computed, ref, nextTick } from 'vue'
import { useReaderStore } from '@/stores/useReaderStore'
import { useBookStore } from '@/stores/useBookStore'
import { useToast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import { useTrackingBookStore } from '@/stores/useTrackingBookStore'

const { toast } = useToast()
const readerStore = useReaderStore()
const bookStore = useBookStore()
const trackingBookStore = useTrackingBookStore()

const readers = computed(() => readerStore.readers)
const books = computed(() => bookStore.books)

const readerSearchTerm = ref('')
const bookSearchTerm = ref('')
const selectedReaderName = ref('')
const selectedBookTitle = ref('')
const readerOpen = ref(false)
const bookOpen = ref(false)
const dialogOpen = ref(false)
const isSubmitting = ref(false)

function debounce(func, delay) {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

const debouncedReaderSearch = debounce(async () => {
  readerStore.setSearchParams('HoLot', readerSearchTerm.value)
  await readerStore.fetchReaders()
}, 300)

const debouncedBookSearch = debounce(async () => {
  bookStore.setSearchParams('TenSach', bookSearchTerm.value)
  await bookStore.fetchBooks()
}, 300)

const formValues = ref({
  MaDocGia: '',
  MaSach: ''
})

const formSchema = toTypedSchema(
  z.object({
    MaDocGia: z.string().min(1, { message: 'Vui lòng chọn một độc giả.' }),
    MaSach: z.string().min(1, { message: 'Vui lòng chọn một cuốn sách.' })
  })
)

const onSubmit = async (values) => {
  isSubmitting.value = true

  const response = await trackingBookStore.createTrackingBook(values.MaDocGia, values.MaSach)
  isSubmitting.value = false
  if (response.data.success) {
    toast({
      title: 'Đơn mượn sách đã được tạo thành công',
      description: `Yêu cầu mượn sách ${selectedBookTitle.value} của đọc giả ${selectedReaderName.value} đã được tạo thành công`
    })
  } else {
    toast({
      title: 'Có lỗi xảy ra',
      description: response.data.message,
      variant: 'destructive'
    })
  }
  closeDialog()
}

const openDialog = async () => {
  bookStore.resetStates()
  readerStore.resetStates()

  bookStore.setPaginationParams(1, 5)

  await bookStore.fetchBooks()
  await readerStore.fetchReaders()

  dialogOpen.value = true
}

const closeDialog = () => {
  dialogOpen.value = false
  nextTick(() => {
    readerSearchTerm.value = ''
    bookSearchTerm.value = ''
    selectedReaderName.value = ''
    selectedBookTitle.value = ''
  })
}

const handleDialogUpdate = (isOpen) => {
  if (!isOpen) {
    closeDialog()
  }
}
</script>
