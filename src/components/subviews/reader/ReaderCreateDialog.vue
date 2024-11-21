<template>
  <Dialog v-model:open="dialogOpen" @update:open="handleDialogOpenChange">
    <DialogTrigger as-child>
      <Button class="inline-flex items-center bg-blue-600 hover:bg-blue-500">
        <Plus class="size-4 mr-2"></Plus> <span> Thêm đọc giả </span>
      </Button>
    </DialogTrigger>

    <DialogContent class="max-w-xl">
      <DialogHeader>
        <DialogTitle>Thêm đọc giả mới</DialogTitle>
        <DialogDescription>
          Điền các thông tin cần thiết vào form bên dưới, sau đó ấn nút để tiến hành thêm
        </DialogDescription>
      </DialogHeader>
      <Form
        v-slot="{ meta, values, validate }"
        as=""
        keep-values
        :validation-schema="toTypedSchema(formSchema[stepIndex - 1])"
        @submit="onSubmit"
      >
        <Stepper
          v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }"
          v-model="stepIndex"
          class="block w-full my-4"
        >
          <form
            @submit="
              (e) => {
                e.preventDefault()
                validate()

                if (stepIndex === steps.length && meta.valid) {
                  onSubmit(values)
                }
              }
            "
          >
            <div class="flex w-full flex-start gap-2">
              <StepperItem
                v-for="step in steps"
                :key="step.step"
                v-slot="{ state }"
                class="relative flex w-full flex-col items-center justify-center"
                :step="step.step"
              >
                <StepperSeparator
                  v-if="step.step !== steps[steps.length - 1].step"
                  class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                />

                <StepperTrigger as-child>
                  <Button
                    :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
                    size="icon"
                    class="z-10 rounded-full shrink-0"
                    :class="[
                      state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background'
                    ]"
                    :disabled="state !== 'completed' && !meta.valid"
                  >
                    <Check v-if="state === 'completed'" class="size-5" />
                    <Circle v-if="state === 'active'" />
                    <Dot v-if="state === 'inactive'" />
                  </Button>
                </StepperTrigger>

                <div class="mt-5 flex flex-col items-center text-center">
                  <StepperTitle
                    :class="[state === 'active' && 'text-primary']"
                    class="text-sm font-semibold transition lg:text-base"
                  >
                    {{ step.title }}
                  </StepperTitle>
                  <StepperDescription
                    :class="[state === 'active' && 'text-primary']"
                    class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
                  >
                    {{ step.description }}
                  </StepperDescription>
                </div>
              </StepperItem>
            </div>

            <div class="flex flex-col gap-4 mt-4">
              <template v-if="stepIndex === 1">
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
                        <FormItem>
                          <FormLabel for="Ten">Tên</FormLabel>
                          <FormControl>
                            <Input id="Ten" placeholder="A" v-bind="componentField" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
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
                              <Button
                                variant="outline"
                                class="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon class="mr-2 h-4 w-4" />
                                {{
                                  componentField.modelValue
                                    ? componentField.modelValue
                                    : 'Chọn ngày'
                                }}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-auto p-0">
                              <CalendarAdvanced v-bind="componentField"></CalendarAdvanced>
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
                </div>
              </template>

              <template v-if="stepIndex === 2">
                <FormField v-slot="{ componentField }" name="DiaChi">
                  <FormItem>
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        v-bind="componentField"
                        autocomplete="on"
                        placeholder="Số nhà, đường, quận..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="DienThoai">
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        v-bind="componentField"
                        autocomplete="on"
                        placeholder="0123456789"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </template>

              <template v-if="stepIndex === 3">
                <FormField v-slot="{ componentField }" name="TenDangNhap">
                  <FormItem>
                    <FormLabel>Tên đăng nhập</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        v-bind="componentField"
                        autocomplete="on"
                        placeholder="Vui lòng nhập tên đăng nhập"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="MatKhau">
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        v-bind="componentField"
                        autocomplete="on"
                        placeholder="Mật khẩu ít nhất 8 kí tự, bao gồm chữ thường, chữ hoa và chữ số"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="NhapLaiMatKhau">
                  <FormItem>
                    <FormLabel>Nhập lại mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        v-bind="componentField"
                        autocomplete="on"
                        placeholder="Vui lòng nhập lại mật khẩu"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </template>
            </div>

            <Separator class="mt-4"></Separator>

            <div v-if="formError" class="mt-4 text-red-500 text-sm" role="alert">
              {{ formError }}
            </div>

            <div class="flex items-center justify-between mt-4 space-x-2">
              <Button
                :disabled="isPrevDisabled"
                variant="outline"
                @click="prevStep()"
                class="w-full"
              >
                Quay lại
              </Button>
              <div class="flex items-center gap-3 w-full">
                <Button
                  v-if="stepIndex !== 3"
                  :type="meta.valid ? 'button' : 'submit'"
                  :disabled="isNextDisabled"
                  @click="meta.valid && nextStep()"
                  class="w-full"
                >
                  Tiếp theo
                </Button>
                <Button v-if="stepIndex === 3" type="submit" class="w-full"> Thêm </Button>
              </div>
            </div>
          </form>
        </Stepper>
      </Form>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Stepper,
  StepperDescription,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger
} from '@/components/ui/stepper'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

import { toTypedSchema } from '@vee-validate/zod'
import { Check, Circle, Dot, Plus, CalendarIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import { CalendarDate } from '@internationalized/date'

import CalendarAdvanced from '@/components/register/CalendarAdvanced.vue'

import { useReaderStore } from '@/stores/useReaderStore'
import { useAccountStore } from '@/stores/useAccountStore'

import * as z from 'zod'
import { useToast } from '@/components/ui/toast'

const { toast } = useToast()

const formSchema = [
  z.object({
    HoLot: z.string().min(1, { message: 'Họ lót không được để trống' }),
    Ten: z.string().min(1, { message: 'Tên không được để trống' }),
    NgaySinh: z.instanceof(CalendarDate, { message: 'Ngày sinh không hợp lệ' }),
    GioiTinh: z.enum(['MALE', 'FEMALE', 'UNKNOWN'], { required_error: 'Vui lòng chọn giới tính' })
  }),
  z.object({
    DiaChi: z.string().optional(),
    DienThoai: z
      .string()
      .regex(/^\d{10}$/, 'Số điện thoại không hợp lệ')
      .optional()
  }),
  z
    .object({
      TenDangNhap: z.string().min(2).max(50),
      MatKhau: z
        .string()
        .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự!' })
        .max(50)
        .regex(/[a-z]/, { message: 'Mật khẩu phải có ít nhất một chữ thường!' })
        .regex(/[A-Z]/, { message: 'Mật khẩu phải có ít nhất một chữ hoa!' })
        .regex(/\d/, { message: 'Mật khẩu phải có ít nhất một số!' }),
      NhapLaiMatKhau: z.string()
    })
    .refine(
      (values) => {
        return values.MatKhau === values.NhapLaiMatKhau
      },
      {
        message: 'Mật khẩu và mật khẩu nhập lại không khớp!',
        path: ['NhapLaiMatKhau']
      }
    )
]

const stepIndex = ref(1)
const steps = [
  {
    step: 1,
    title: 'Bước 1',
    description: 'Thông tin cơ bản'
  },
  {
    step: 2,
    title: 'Bước 2',
    description: 'Thông tin thêm'
  },
  {
    step: 3,
    title: 'Bước 3',
    description: 'Thông tin tài khoản'
  }
]

const calendarDateToISOString = (calendarDate) => {
  const year = calendarDate.year.toString().padStart(4, '0')
  const month = calendarDate.month.toString().padStart(2, '0')
  const day = calendarDate.day.toString().padStart(2, '0')

  return `${year}-${month}-${day}T00:00:00.000Z`
}

const readerStore = useReaderStore()
const accountStore = useAccountStore()

const formError = ref('')
const onSubmit = async (inputValues) => {
  const basicInfoFields = ['HoLot', 'Ten', 'NgaySinh', 'GioiTinh', 'DiaChi', 'DienThoai']
  const accountInfoFields = ['TenDangNhap', 'MatKhau']

  const basicInfo = Object.fromEntries(
    basicInfoFields.map((key) => [
      key,
      key === 'NgaySinh' ? calendarDateToISOString(inputValues[key]) : inputValues[key]
    ])
  )

  const accountInfo = {
    ...Object.fromEntries(accountInfoFields.map((key) => [key, inputValues[key]])),
    LoaiTaiKhoan: 'USER'
  }

  try {
    formError.value = ''
    const createdAccount = await accountStore.createAccount(accountInfo)
    await accountStore.fetchAccounts()
    const MaTaiKhoan = createdAccount?.MaTaiKhoan

    if (MaTaiKhoan) {
      const readerInfo = { ...basicInfo, MaTaiKhoan }
      await readerStore.createReader(readerInfo)
      await readerStore.fetchReaders()
      stepIndex.value = 1
      toast({
        title: 'Thêm đọc giả',
        description: `Đọc giả ${readerInfo.HoLot + ' ' + readerInfo.Ten} được thêm thành công`
      })
      closeDialog()
    } else {
      toast({
        title: 'Lỗi',
        variant: 'destructive',
        description: `Đã xảy ra lỗi trong quá trình thêm đọc giả mới`
      })
    }
  } catch (error) {
    console.error('An error occurred during account or reader creation:', error)
    if (error.response && error.response.status === 409) {
      formError.value = 'Tên đăng nhập đã được sử dụng. Vui lòng chọn tên đăng nhập khác.'
    } else {
      formError.value = 'Đã xảy ra lỗi khi tạo tài khoản. Vui lòng thử lại.'
    }
  }
}

const dialogOpen = ref(false)

const closeDialog = () => {
  dialogOpen.value = false
}

const openDialog = () => {
  dialogOpen.value = true
}

const handleDialogOpenChange = (open) => {
  stepIndex.value = 1
}

defineExpose({ openDialog })
</script>
