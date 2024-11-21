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
import { useAccountStore } from '@/stores/useAccountStore'
import { watch } from 'vue'

const field = ref('TenDangNhap')
const searchTerm = ref('')
const accountStore = useAccountStore()

const fields = [
  { value: 'TenDangNhap', label: 'Tên đăng nhập' },
  { value: 'LoaiTaiKhoan', label: 'Loại tài khoản' }
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

const mappingAccountType = {
  'độc giả': 'USER',
  'nhân viên': 'EMPLOYEE',
  'quản trị': 'ADMINISTRATOR'
}

const convertSearchTerm = (term) => {
  const normalizedTerm = term.toLowerCase()

  if (mappingAccountType[normalizedTerm]) {
    return mappingAccountType[normalizedTerm]
  }
  return term
}

const fetchWithDebounce = debounce(async () => {
  const convertedSearchTerm = convertSearchTerm(searchTerm.value)
  accountStore.setSearchParams(field.value, convertedSearchTerm)
  await accountStore.fetchAccounts()
}, 300)

watch(searchTerm, () => {
  fetchWithDebounce()
})

watch(field, (newField, oldField) => {
  accountStore.setSearchParams(oldField)
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
