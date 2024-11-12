<script setup>
import { Search } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ChevronsUpDown } from 'lucide-vue-next'
import { watch } from 'vue'
import { useBookStore } from '@/stores/useBookStore'

const field = ref('TenSach')
const searchTerm = ref('')
const bookStore = useBookStore()

const fields = [
  { value: 'TenSach', label: 'Tên sách' },
  { value: 'DonGia', label: 'Đơn giá' },
  { value: 'SoQuyen', label: 'Số quyển' },
  { value: 'NamXuatBan', label: 'Năm xuất bản' },
  { value: 'NguonGoc', label: 'Nguồn gốc' },
  { value: 'NhaXuatBan.TenNXB', label: 'Tên nhà xuất bản' }
]

const getFieldLabel = (value) => {
  const selectedField = fields.find((f) => f.value === value)
  return selectedField ? selectedField.label : ''
}

const debounce = (func, delay) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

const fetchWithDebounce = debounce(async () => {
  bookStore.setSearchParams(field.value, searchTerm.value)
  await bookStore.fetchBooks()
}, 300)

watch(searchTerm, () => {
  fetchWithDebounce()
})

watch(field, (newField, oldField) => {
  bookStore.setSearchParams(oldField)
  searchTerm.value = ''
  fetchWithDebounce()
})
</script>

<template>
  <div class="flex flex-row space-x-2 w-full">
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button class="flex items-center space-x-2">
            <span>{{ getFieldLabel(field) }}</span>
            <ChevronsUpDown class="w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-48">
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div class="relative w-full max-w-sm items-center">
      <Input v-model="searchTerm" id="search" type="text" placeholder="Tìm kiếm..." class="pl-10" />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <Search class="size-4 text-muted-foreground" />
      </span>
    </div>
  </div>
</template>
