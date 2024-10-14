<template>
  <div class="space-y-4">
    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <Label for="firstName">Họ lót</Label>
        <Input id="firstName" v-model="basicInfo.firstName" placeholder="Nguyễn Văn" />
      </div>
      <div class="space-y-2">
        <Label for="lastName">Tên</Label>
        <Input id="lastName" v-model="basicInfo.lastName" placeholder="A" />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <Label for="dob">Ngày sinh</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" class="w-full justify-start text-left font-normal">
              <CalendarIcon class="mr-2 h-4 w-4" />
              {{
                basicInfo.dob ? df.format(basicInfo.dob.toDate(getLocalTimeZone())) : 'Chọn ngày'
              }}
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <CalendarAdvanced
              v-model="selectedDate"
              :placeholder="placeholderDate"
              @update:model-value="onDateChange"
            ></CalendarAdvanced>
          </PopoverContent>
        </Popover>
      </div>
      <div class="space-y-2">
        <Label for="gender">Giới tính</Label>
        <Select v-model="basicInfo.gender">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Chọn giới tính" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Nam</SelectItem>
            <SelectItem value="female">Nữ</SelectItem>
            <SelectItem value="other">Khác</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    <div class="space-y-2">
      <Label for="location">Địa chỉ</Label>
      <Input id="location" v-model="basicInfo.location" placeholder="Phường, Quận, Thành phố" />
    </div>
    <div class="space-y-2">
      <Label for="phone">Số điện thoại</Label>
      <Input id="phone" v-model="basicInfo.phone" placeholder="0123456789" />
    </div>
  </div>
</template>

<script setup>
import { CalendarIcon } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import CalendarAdvanced from './CalendarAdvanced.vue'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { useRegistrationStore } from '@/stores/useRegistrationStore'
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date'

import { ref, computed } from 'vue'
const registrationStore = useRegistrationStore()

const basicInfo = computed(() => registrationStore.basicInfo)

const selectedDate = ref(today(getLocalTimeZone()))
const placeholderDate = ref(today(getLocalTimeZone()))

const onDateChange = (date) => {
  selectedDate.value = date
  registrationStore.updateBasicInfo({ dob: date }) // Update the DOB in the store
}

const df = new DateFormatter('en-US', {
  dateStyle: 'long'
})
</script>
