<template>
  <Table class="overflow-scroll">
    <TableHeader>
      <TableRow>
        <TableHead @click="sort('MaDocGia')" class="cursor-pointer">
          <div class="flex items-center">
            <span> Mã đọc giả</span>
            <SortIcon
              :column="'MaDocGia'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>
        <TableHead @click="sort('HoLot')" class="cursor-pointer">
          <div class="flex items-center">
            <span>Họ lót</span>
            <SortIcon
              :column="'HoLot'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>
        <TableHead @click="sort('Ten')" class="cursor-pointer">
          <div class="flex items-center">
            <span>Tên</span>
            <SortIcon :column="'Ten'" :currentSort="currentSort" :currentSortDir="currentSortDir" />
          </div>
        </TableHead>
        <TableHead @click="sort('NgaySinh')" class="cursor-pointer">
          <div class="flex items-center">
            <span>Ngày sinh</span>
            <SortIcon
              :column="'NgaySinh'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>
        <TableHead @click="sort('GioiTinh')" class="cursor-pointer">
          <div class="flex items-center">
            <span>Giới tính</span>
            <SortIcon
              :column="'GioiTinh'"
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
        <TableHead @click="sort('DienThoai')" class="cursor-pointer">
          <div class="flex items-center">
            <span>Số điện thoại</span>
            <SortIcon
              :column="'DienThoai'"
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
      <TableRow v-for="reader in readers" :key="reader.MaDocGia">
        <TableCell class="font-medium truncate max-w-8">{{ reader.MaDocGia }}</TableCell>
        <TableCell class="">{{ reader.HoLot }}</TableCell>
        <TableCell>{{ reader.Ten }}</TableCell>
        <TableCell class="">{{ formatDate(reader.NgaySinh) }}</TableCell>
        <TableCell class="text-start">{{ genderLabels[reader.GioiTinh] }}</TableCell>
        <TableCell class="max-w-56">{{ reader.DiaChi }}</TableCell>
        <TableCell class="">{{ reader.DienThoai }}</TableCell>
        <TableCell class="">{{ reader.TaiKhoan.TenDangNhap }}</TableCell>
        <TableCell class="text-right max-w-fit">
          <Button variant="outline" size="sm" class="mr-2" @click="editReader(reader)">
            <Pencil class="size-4"></Pencil>
          </Button>
          <Button variant="destructive" size="sm" @click="deleteReader(reader)">
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
import { useReaderStore } from '@/stores/useReaderStore'
import { Pencil, Trash, ChevronUp, ChevronDown, Lock } from 'lucide-vue-next'
import { ref } from 'vue'

const currentSort = ref('')
const currentSortDir = ref('asc')

const nonSortableColumns = ['MaDocGia']

const readerStore = useReaderStore()

onMounted(async () => {
  await readerStore.fetchReaders()
})

const readers = computed(() => readerStore.readers)

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()
  return `${day}/${month}/${year}`
}

const genderLabels = {
  MALE: 'Nam',
  FEMALE: 'Nữ',
  UNKNOWN: 'Khác'
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
  readerStore.setSortParams(currentSort.value, currentSortDir.value)
  await readerStore.fetchReaders()
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

const emit = defineEmits(['edit', 'delete'])

const editReader = (reader) => {
  emit('edit', reader)
}

const deleteReader = (reader) => {
  emit('delete', reader)
}
</script>
