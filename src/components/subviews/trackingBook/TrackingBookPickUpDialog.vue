<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <DialogTitle>Xác nhận lấy sách</DialogTitle>
        <DialogDescription> Xác nhận lấy sách và chọn ngày dự kiến trả sách </DialogDescription>
      </DialogHeader>
      <div class="flex justify-center mb-4">
        <BookUp class="size-20 text-gray-300 my-8" />
      </div>
      <Form
        v-slot="{ values }"
        :validation-schema="toTypedSchema(formSchema)"
        @submit="handleConfirm"
      >
        <div class="space-y-4">
          <p class="text-sm text-gray-500">
            Xác nhận lấy sách <b>{{ TenSach }}</b> cho đọc giả <b>{{ HoTen }}</b
            >?
          </p>
          <FormField v-slot="{ componentField }" name="NgayTra">
            <FormItem>
              <FormLabel for="NgayTra">Ngày dự kiến trả sách</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      class="w-full justify-start text-left font-normal"
                      :class="{ 'text-muted-foreground': !values.NgayTra }"
                    >
                      <CalendarIcon class="mr-2 h-4 w-4" />
                      {{
                        values.NgayTra ? format(values.NgayTra, 'PPP', { locale: vi }) : 'Chọn ngày'
                      }}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="w-auto p-0">
                    <CalendarAdvanced v-bind="componentField" />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <DialogFooter>
            <Button @click="closeDialog" variant="outline" class="w-full mt-2">Hủy</Button>
            <Button type="submit" class="w-full">Xác nhận</Button>
          </DialogFooter>
        </div>
      </Form>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { CalendarDate, today } from '@internationalized/date'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useToast } from '@/components/ui/toast'
import { useTrackingBookStore } from '@/stores/useTrackingBookStore'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { BookUp, CalendarIcon } from 'lucide-vue-next'
import CalendarAdvanced from '@/components/register/CalendarAdvanced.vue'

const { toast } = useToast()
const trackingBookStore = useTrackingBookStore()
const dialogOpen = ref(false)

const id = ref('')
const TenSach = ref('')
const HoTen = ref('')

const formSchema = z.object({
  NgayTra: z.instanceof(CalendarDate, { message: 'Vui lòng chọn ngày trả sách' }).refine(
    (date) => {
      const currentDate = today('Asia/Ho_Chi_Minh')
      return date.compare(currentDate) > 0
    },
    {
      message: 'Ngày trả sách phải sau ngày hôm nay'
    }
  )
})

const openDialog = (trackingBook) => {
  id.value = trackingBook.MaTDMS
  TenSach.value = trackingBook.Sach.TenSach
  HoTen.value = trackingBook.DocGia.HoTen
  dialogOpen.value = true
}

const closeDialog = () => {
  dialogOpen.value = false
}

const calendarDateToISOString = (calendarDate) => {
  const year = calendarDate.year.toString().padStart(4, '0')
  const month = calendarDate.month.toString().padStart(2, '0')
  const day = calendarDate.day.toString().padStart(2, '0')
  return `${year}-${month}-${day}T00:00:00.000Z`
}

const handleConfirm = async (values) => {
  try {
    const returnDate = calendarDateToISOString(values.NgayTra)
    await trackingBookStore.pickUpBook(id.value, returnDate)
    toast({
      title: 'Xác nhận lấy sách',
      description: `Sách ${TenSach.value} đã được đọc giả ${HoTen.value} lấy. Ngày dự kiến trả: ${format(new Date(returnDate), 'dd/MM/yyyy')}`
    })
    closeDialog()
  } catch (error) {
    console.error('An error occurred during book pickup confirmation:', error)
    toast({
      title: 'Lỗi',
      variant: 'destructive',
      description: 'Đã xảy ra lỗi khi xác nhận lấy sách. Vui lòng thử lại.'
    })
  }
}

defineExpose({ openDialog })
</script>
