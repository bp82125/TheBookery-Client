<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ dialogTitle }}</DialogTitle>
        <DialogDescription>
          Điền các thông tin cần thiết vào form bên dưới, ấn lưu để tiến hành lưu lại
        </DialogDescription>
      </DialogHeader>

      <Form :validation-schema="formSchema" @submit="onSubmit" :initial-values="formValues">
        <div class="space-y-4">
          <div class="grid gap-4" :class="isReader ? 'grid-cols-2' : 'grid-cols-1'">
            <FormField v-slot="{ componentField }" :name="nameField">
              <FormItem>
                <FormLabel :for="nameField">{{ nameLabel }}</FormLabel>
                <FormControl>
                  <Input :id="nameField" :placeholder="namePlaceholder" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <template v-if="isReader">
              <FormField v-slot="{ componentField }" name="Ten">
                <FormItem>
                  <FormLabel for="Ten">Tên</FormLabel>
                  <FormControl>
                    <Input id="Ten" placeholder="A" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </template>
          </div>

          <template v-if="isReader">
            <div class="grid grid-cols-2 gap-4">
              <FormField v-slot="{ componentField }" name="NgaySinh">
                <FormItem>
                  <FormLabel for="NgaySinh">Ngày sinh</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          class="w-full justify-start text-left font-normal"
                        >
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
          </template>

          <!-- Common fields for both Employee and Reader -->
          <FormField v-slot="{ componentField }" name="DiaChi">
            <FormItem>
              <FormLabel for="DiaChi">Địa chỉ</FormLabel>
              <FormControl>
                <Input id="DiaChi" placeholder="432A Đường 30/4" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" :name="phoneField">
            <FormItem>
              <FormLabel :for="phoneField">Số điện thoại</FormLabel>
              <FormControl>
                <Input :id="phoneField" placeholder="0123456789" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="flex flex-row w-full space-x-2 mt-6">
          <Button variant="outline" @click="closeDialog" class="w-full">Hủy</Button>
          <Button type="submit" class="w-full"> Cập nhật </Button>
        </div>
      </Form>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { CalendarIcon } from 'lucide-vue-next'
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
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import CalendarAdvanced from '@/components/register/CalendarAdvanced.vue'
import { useToast } from '@/components/ui/toast'
import { useAuthStore } from '@/stores/useAuthStore'
import { useEmployeeStore } from '@/stores/useEmployeeStore'
import { useReaderStore } from '@/stores/useReaderStore'
import { CalendarDate, GregorianCalendar } from '@internationalized/date'

const { toast } = useToast()
const authStore = useAuthStore()
const employeeStore = useEmployeeStore()
const readerStore = useReaderStore()

const dialogOpen = ref(false)
const formValues = ref({})

const isEmployee = computed(() => authStore.account.LoaiTaiKhoan === 'EMPLOYEE')
const isReader = computed(() => authStore.account.LoaiTaiKhoan === 'USER')

const dialogTitle = computed(() =>
  isEmployee.value ? 'Chỉnh sửa thông tin nhân viên' : 'Chỉnh sửa thông tin độc giả'
)

const nameField = computed(() => (isEmployee.value ? 'HoTenNV' : 'HoLot'))
const nameLabel = computed(() => (isEmployee.value ? 'Họ tên' : 'Họ lót'))
const namePlaceholder = computed(() => (isEmployee.value ? 'Nguyễn Văn A' : 'Nguyễn Văn'))
const phoneField = computed(() => (isEmployee.value ? 'SoDienThoai' : 'DienThoai'))

const formSchema = computed(() => {
  const commonSchema = {
    DiaChi: z.string().min(1, 'Địa chỉ không được để trống'),
    [phoneField.value]: z.string().regex(/^\d{10}$/, 'Số điện thoại không hợp lệ')
  }

  if (isEmployee.value) {
    return toTypedSchema(
      z.object({
        HoTenNV: z.string().min(1, { message: 'Họ tên không được để trống' }),
        ...commonSchema
      })
    )
  } else {
    return toTypedSchema(
      z.object({
        HoLot: z.string().min(1, 'Họ lót không được để trống'),
        Ten: z.string().min(1, 'Tên không được để trống'),
        NgaySinh: z.instanceof(CalendarDate, { message: 'Ngày sinh không hợp lệ' }),
        GioiTinh: z.enum(['MALE', 'FEMALE', 'UNKNOWN'], {
          required_error: 'Vui lòng chọn giới tính'
        }),
        ...commonSchema
      })
    )
  }
})

const openDialog = () => {
  if (authStore.account.LoaiTaiKhoan === 'ADMINISTRATOR') {
    console.warn('Administrators cannot update their information through this dialog.')
    return
  }

  const userData = isEmployee.value ? authStore.account.NhanVien : authStore.account.DocGia

  formValues.value = isEmployee.value
    ? {
        HoTenNV: userData.HoTenNV,
        ChucVu: userData.ChucVu,
        DiaChi: userData.DiaChi,
        SoDienThoai: userData.SoDienThoai,
        MaTaiKhoan: authStore.account.MaTaiKhoan
      }
    : {
        HoLot: userData.HoLot,
        Ten: userData.Ten,
        NgaySinh: isoStringToCalendarDate(userData.NgaySinh),
        GioiTinh: userData.GioiTinh,
        DiaChi: userData.DiaChi,
        DienThoai: userData.DienThoai,
        MaTaiKhoan: authStore.account.MaTaiKhoan
      }
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
  if (isEmployee.value) {
    await employeeStore.updateEmployee(authStore.account.NhanVien.MSNV, values)
    toast({
      title: 'Cập nhật thông tin nhân viên',
      description: `Thông tin của nhân viên ${values.HoTenNV} đã được cập nhật thành công`
    })
  } else {
    values.NgaySinh = calendarDateToISOString(values.NgaySinh)
    await readerStore.updateReader(authStore.account.DocGia.MaDocGia, values)
    toast({
      title: 'Cập nhật đọc giả',
      description: `Đọc giả ${values.HoLot + ' ' + values.Ten} được cập nhật thành công`
    })
  }
  await authStore.fetchAccountById(authStore.account.MaTaiKhoan)
  closeDialog()
}

const closeDialog = () => {
  dialogOpen.value = false
}

defineExpose({ openDialog })
</script>
