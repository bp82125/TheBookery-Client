<template>
  <Table class="overflow-scroll">
    <TableHeader>
      <TableRow>
        <TableHead @click="sort('MaTaiKhoan')" class="cursor-pointer">
          <div class="flex items-center">
            <span> Mã tài khoản</span>
            <SortIcon
              :column="'MaTaiKhoan'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>
        <TableHead @click="sort('TenDangNhap')" class="cursor-pointer">
          <div class="flex items-center">
            <span>Tên đăng nhập</span>
            <SortIcon
              :column="'TenDangNhap'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>
        <TableHead @click="sort('HoTen')" class="cursor-pointer">
          <div class="flex items-center">
            <span>Họ tên</span>
            <SortIcon
              :column="'HoTen'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>
        <TableHead @click="sort('LoaiTaiKhoan')" class="cursor-pointer">
          <div class="flex justify-center items-center">
            <span>Loại tài khoản</span>
            <SortIcon
              :column="'LoaiTaiKhoan'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>
        <TableHead @click="sort('KichHoat')" class="cursor-pointer">
          <div class="flex justify-center items-center">
            <span>Trạng thái tài khoản</span>
            <SortIcon
              :column="'KichHoat'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>
        <TableHead @click="sort('createdAt')" class="cursor-pointer">
          <div class="flex items-center">
            <span>Thời gian tạo</span>
            <SortIcon
              :column="'createdAt'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>

        <TableHead></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="account in accounts" :key="account.MaTaiKhoan">
        <TableCell class="font-medium truncate max-w-8">{{ account.MaTaiKhoan }}</TableCell>
        <TableCell class="">{{ account.TenDangNhap }}</TableCell>
        <TableCell class="">{{ getFullName(account) }}</TableCell>
        <TableCell class="text-center">{{ formatAccountType(account.LoaiTaiKhoan) }}</TableCell>
        <TableCell class="flex justify-center items-center py-5">
          <BadgeCheck v-if="account.KichHoat" class="text-green-500" />
          <BadgeX v-else class="text-red-500"
        /></TableCell>
        <TableCell class="">{{ formatISODate(account.createdAt) }}</TableCell>
        <TableCell class="text-right max-w-fit">
          <template v-if="account.LoaiTaiKhoan !== 'ADMINISTRATOR'">
            <Button variant="outline" size="sm" class="mr-2" @click="resetPasswordAccount(account)">
              <KeyRound class="size-4"></KeyRound>
            </Button>
            <Button size="sm" class="mr-2" @click="toggleAccount(account)">
              <template v-if="account.KichHoat">
                <LockKeyhole class="size-4"></LockKeyhole>
              </template>
              <template v-else>
                <LockKeyholeOpen class="size-4"></LockKeyholeOpen>
              </template>
            </Button>
            <Button variant="destructive" size="sm" @click="deleteAccount(account)">
              <Trash class="size-4"></Trash
            ></Button>
          </template>
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
import {
  KeyRound,
  LockKeyhole,
  LockKeyholeOpen,
  Trash,
  ChevronUp,
  ChevronDown,
  BadgeCheck,
  BadgeX,
  Lock
} from 'lucide-vue-next'
import { ref } from 'vue'

import { useAccountStore } from '@/stores/useAccountStore'

const currentSort = ref('')
const currentSortDir = ref('asc')

const accountStore = useAccountStore()

onMounted(async () => {
  await accountStore.fetchAccounts()
})

const accounts = computed(() => accountStore.accounts)
const nonSortableColumns = ['MaTaiKhoan', 'HoTen']

const formatISODate = (isoDate) => {
  const date = new Date(isoDate)
  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
}

const formatAccountType = (type) => {
  if (type === 'USER') {
    return 'Đọc giả'
  }
  if (type === 'EMPLOYEE') {
    return 'Nhân viên'
  }
  if (type === 'ADMINISTRATOR') {
    return 'Quản trị'
  }
}

const getFullName = (account) => {
  if (account.DocGia) {
    return account.DocGia.HoTen
  } else if (account.NhanVien) {
    return account.NhanVien.HoTenNV
  }
  return 'N/A'
}

const sort = async (column) => {
  if (nonSortableColumns.includes(column)) {
    currentSort.value = column
    currentSortDir.value = 'asc'
    return
  }

  if (column === currentSort.value) {
    currentSortDir.value = currentSortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    currentSort.value = column
    currentSortDir.value = 'asc'
  }

  accountStore.setSortParams(currentSort.value, currentSortDir.value)
  await accountStore.fetchAccounts()
}

const SortIcon = defineComponent({
  props: ['column', 'currentSort', 'currentSortDir'],
  setup(props) {
    return () => {
      if (props.column !== props.currentSort) {
        return null
      }

      if (nonSortableColumns.includes(props.column)) {
        return h(Lock, { class: 'ml-1 text-gray-500 size-4' })
      }

      return h(props.currentSortDir === 'asc' ? ChevronUp : ChevronDown, {
        class: 'inline-block ml-1 size-4'
      })
    }
  }
})

const emit = defineEmits(['toggle', 'delete', 'resetPassword'])

const resetPasswordAccount = (account) => {
  emit('resetPassword', account)
}

const toggleAccount = (account) => {
  emit('toggle', account)
}

const deleteAccount = (account) => {
  emit('delete', account)
}
</script>
