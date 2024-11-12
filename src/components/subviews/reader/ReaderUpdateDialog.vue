<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Chỉnh sửa thông tin độc giả</DialogTitle>
        <DialogDescription>
          Điền các thông tin cần thiết vào form bên dưới, ấn lưu để tiến hành lưu lại
        </DialogDescription>
      </DialogHeader>

      <Form :validation-schema="formSchema" @submit="onSubmit" :initial-values="formValues">
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <FormField v-slot="{ componentField }" name="HoLot">
              <FormItem>
                <FormLabel for="HoLot">Họ lót</FormLabel>
                <FormControl>
                  <Input id="HoLot" placeholder="Nguyễn Văn" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="Ten">
              <FormItem>
                <FormLabel for="Ten">Tên</FormLabel>
                <FormControl>
                  <Input id="Ten" placeholder="A" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <FormField v-slot="{ componentField }" name="NgaySinh">
              <FormItem>
                <FormLabel for="NgaySinh">Ngày sinh</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" class="w-full justify-start text-left font-normal">
                        <CalendarIcon class="mr-2 h-4 w-4" />
                        {{ componentField ? componentField.modelValue : 'Chọn ngày' }}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent class="w-auto p-0">
                      <CalendarAdvanced
                        v-bind="componentField"
                        @update:model-value="onDateChange"
                      ></CalendarAdvanced>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="GioiTinh">
              <FormItem>
                <FormLabel for="GioiTinh">Giới tính</FormLabel>
                <FormControl>
                  <Select v-bind="componentField">
                    <SelectTrigger class="w-full">
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Nam</SelectItem>
                      <SelectItem value="FEMALE">Nữ</SelectItem>
                      <SelectItem value="UNKNOWN">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <FormField v-slot="{ componentField }" name="DiaChi">
            <FormItem>
              <FormLabel for="DiaChi">Địa chỉ</FormLabel>
              <FormControl>
                <Input v-bind="componentField" id="DiaChi" placeholder="Phường, Quận, Thành phố" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="DienThoai">
            <FormItem>
              <FormLabel for="DienThoai">Số điện thoại</FormLabel>
              <FormControl>
                <Input v-bind="componentField" id="DienThoai" placeholder="0123456789" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="flex flex-row w-full space-x-2 mt-6">
            <Button variant="outline" @click="closeDialog" class="w-full">Hủy</Button>
            <Button type="submit" class="w-full"> Cập nhật </Button>
          </div>
        </div>
      </Form>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { CalendarIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import CalendarAdvanced from '@/components/register/CalendarAdvanced.vue'
import { useReaderStore } from '@/stores/useReaderStore'

import { CalendarDate, GregorianCalendar } from '@internationalized/date'
import { useToast } from '@/components/ui/toast'

const { toast } = useToast()

const readerStore = useReaderStore()
const dialogOpen = ref(false)
const formId = ref('')
const formValues = ref({
  HoLot: '',
  Ten: '',
  NgaySinh: null,
  GioiTinh: '',
  DiaChi: '',
  DienThoai: '',
  MaTaiKhoan: ''
})

const formSchema = toTypedSchema(
  z.object({
    HoLot: z.string().min(1, 'Họ lót không được để trống'),
    Ten: z.string().min(1, 'Tên không được để trống'),
    NgaySinh: z.instanceof(CalendarDate, { message: 'Ngày sinh không hợp lệ' }),
    GioiTinh: z.enum(['MALE', 'FEMALE', 'UNKNOWN'], { required_error: 'Vui lòng chọn giới tính' }),
    DiaChi: z.string().min(1, 'Địa chỉ không được để trống'),
    DienThoai: z.string().regex(/^\d{10}$/, 'Số điện thoại không hợp lệ')
  })
)

const openDialog = (reader) => {
  formId.value = reader.MaDocGia
  formValues.value.HoLot = reader.HoLot
  formValues.value.Ten = reader.Ten
  formValues.value.NgaySinh = isoStringToCalendarDate(reader.NgaySinh)
  formValues.value.GioiTinh = reader.GioiTinh
  formValues.value.DiaChi = reader.DiaChi
  formValues.value.DienThoai = reader.DienThoai
  formValues.value.MaTaiKhoan = reader.TaiKhoan.MaTaiKhoan
  dialogOpen.value = true
}

const isoStringToCalendarDate = (isoDate) => {
  const date = new Date(isoDate)

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format')
  }

  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()

  const calendar = new GregorianCalendar()

  return new CalendarDate(calendar, year, month, day)
}

const calendarDateToISOString = (calendarDate) => {
  const year = calendarDate.year.toString().padStart(4, '0')
  const month = calendarDate.month.toString().padStart(2, '0')
  const day = calendarDate.day.toString().padStart(2, '0')

  return `${year}-${month}-${day}T00:00:00.000Z`
}

const onDateChange = (date) => {
  formValues.value.NgaySinh = date
}

const onSubmit = async (values) => {
  values.NgaySinh = calendarDateToISOString(values.NgaySinh)
  await readerStore.updateReader(formId.value, values)

  toast({
    title: 'Cập nhật đọc giả',
    description: `Đọc giả ${values.HoLot + ' ' + values.Ten} được cập nhật thành công`
  })
  closeDialog()
}

const closeDialog = () => {
  dialogOpen.value = false
}

defineExpose({ openDialog })
</script>
