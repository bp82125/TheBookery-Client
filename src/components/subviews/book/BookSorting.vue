<script setup>
import { ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu'
import { ChevronsUpDown, ArrowUpIcon, ArrowDownIcon } from 'lucide-vue-next'
import { useBookStore } from '@/stores/useBookStore'

const field = ref('')
const order = ref('asc')
const bookStore = useBookStore()

const fields = [
  { value: 'TenSach', label: 'Tên sách' },
  { value: 'DonGia', label: 'Đơn giá' },
  { value: 'SoQuyen', label: 'Số quyển' },
  { value: 'NamXuatBan', label: 'Năm xuất bản' },
  { value: 'NguonGoc', label: 'Nguồn gốc' },
  { value: 'NhaXuatBan.TenNXB', label: 'Tên nhà xuất bản' }
]

const orders = [
  { value: 'asc', label: 'Tăng dần', icon: ArrowUpIcon },
  { value: 'desc', label: 'Giảm dần', icon: ArrowDownIcon }
]

const getFieldLabel = (value) => {
  const selectedField = fields.find((f) => f.value === value)
  return selectedField ? selectedField.label : ''
}

const getOrderLabel = (value) => {
  const selectedOrder = orders.find((o) => o.value === value)
  return selectedOrder ? selectedOrder.label : ''
}

watch([field, order], ([newField, newOrder]) => {
  bookStore.setSortParams(newField, newOrder)
  bookStore.fetchBooks()
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="flex items-center space-x-2">
        <span>Sắp xếp: {{ getFieldLabel(field) }} ({{ getOrderLabel(order) }})</span>
        <ChevronsUpDown class="w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>Sắp xếp theo</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup v-model="field">
        <DropdownMenuRadioItem
          v-for="fieldOption in fields"
          :key="fieldOption.value"
          :value="fieldOption.value"
        >
          {{ fieldOption.label }}
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
      <DropdownMenuSeparator />
      <DropdownMenuLabel>Thứ tự</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuRadioGroup v-model="order">
          <DropdownMenuRadioItem
            v-for="orderOption in orders"
            :key="orderOption.value"
            :value="orderOption.value"
            class="flex items-center"
          >
            <component :is="orderOption.icon" class="mr-2 h-4 w-4" />
            {{ orderOption.label }}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
