<template>
  <Table class="overflow-scroll">
    <TableHeader>
      <TableRow>
        <TableHead @click="sort('MSNV')" class="cursor-pointer">
          <div class="flex items-center">
            <span> Mã nhân viên</span>
            <SortIcon
              :column="'MSNV'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>
        <TableHead @click="sort('HoTenNV')" class="cursor-pointer">
          <div class="flex items-center">
            <span>Họ tên</span>
            <SortIcon
              :column="'HoTenNV'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>
        <TableHead @click="sort('ChucVu')" class="cursor-pointer">
          <div class="flex items-center">
            <span>Chức vụ</span>
            <SortIcon
              :column="'ChucVu'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>
        <TableHead @click="sort('DiaChi')" class="cursor-pointer">
          <div class="flex items-center">
            <span>Địa chỉ</span>
            <SortIcon
              :column="'DiaChi'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>
        <TableHead @click="sort('SoDienThoai')" class="cursor-pointer">
          <div class="flex items-center">
            <span>Số điện thoại</span>
            <SortIcon
              :column="'SoDienThoai'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>

        <TableHead @click="sort('TaiKhoan.TenDangNhap')" class="cursor-pointer">
          <div class="flex items-center">
            <span>Tên đăng nhập</span>
            <SortIcon
              :column="'TaiKhoan.TenDangNhap'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="employee in employees" :key="employee.MSNV">
        <TableCell class="font-medium truncate max-w-8">{{ employee.MSNV }}</TableCell>
        <TableCell class="">{{ employee.HoTenNV }}</TableCell>
        <TableCell>{{ employee.ChucVu }}</TableCell>
        <TableCell class="max-w-56">{{ employee.DiaChi }}</TableCell>
        <TableCell class="">{{ employee.SoDienThoai }}</TableCell>
        <TableCell class="">{{ employee.TaiKhoan.TenDangNhap }}</TableCell>
        <TableCell class="text-right max-w-fit">
          <Button variant="outline" size="sm" class="mr-2" @click="editEmployee(employee)">
            <Pencil class="size-4"></Pencil>
          </Button>
          <Button variant="destructive" size="sm" @click="deleteEmployee(employee)">
            <Trash class="size-4"></Trash
          ></Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup>
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { computed, onMounted, defineComponent, h } from 'vue'
import { Pencil, Trash, ChevronUp, ChevronDown } from 'lucide-vue-next'
import { ref } from 'vue'

import { useEmployeeStore } from '@/stores/useEmployeeStore'

const currentSort = ref('')
const currentSortDir = ref('asc')

const employeeStore = useEmployeeStore()

onMounted(async () => {
  await employeeStore.fetchEmployees()
})

const employees = computed(() => employeeStore.employees)

const sort = async (column) => {
  if (column === currentSort.value) {
    currentSortDir.value = currentSortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    currentSort.value = column
    currentSortDir.value = 'asc'
  }
  employeeStore.setSortParams(currentSort.value, currentSortDir.value)
  await employeeStore.fetchEmployees()
}

const SortIcon = defineComponent({
  props: ['column', 'currentSort', 'currentSortDir'],
  setup(props) {
    return () => {
      if (props.column !== props.currentSort) {
        return null
      }
      return h(props.currentSortDir === 'asc' ? ChevronUp : ChevronDown, {
        class: 'inline-block ml-1 size-4'
      })
    }
  }
})

const emit = defineEmits(['edit', 'delete'])

const editEmployee = (employee) => {
  emit('edit', employee)
}

const deleteEmployee = (employee) => {
  emit('delete', employee)
}
</script>
