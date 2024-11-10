<template>
  <Table class="overflow-scroll">
    <TableHeader>
      <TableRow>
        <TableHead @click="sort('MaTDMS')" class="cursor-pointer">
          <div class="flex items-center">
            <span> Mã mượn sách</span>
            <SortIcon
              :column="'MaTDMS'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>
        <TableHead @click="sort('Sach.TenSach')" class="cursor-pointer">
          <div class="flex items-center">
            <span> Tên sách</span>
            <SortIcon
              :column="'Sach.TenSach'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>
        <TableHead @click="sort('DocGia.Ten')" class="cursor-pointer">
          <div class="flex items-center">
            <span> Người mượn</span>
            <SortIcon
              :column="'DocGia.Ten'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>
        <TableHead @click="sort(currentStateInfo.name)" class="cursor-pointer text-right">
          <div class="flex items-center">
            <span>{{ currentStateInfo.label }}</span>
            <SortIcon
              :column="currentStateInfo.name"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>

        <template v-if="currentState === 'PICKED_UP'">
          <TableHead @click="sort('NgayTra')" class="cursor-pointer text-right">
            <div class="flex items-center">
              <span>Ngày trả dự kiến</span>
              <SortIcon
                :column="'NgayTra'"
                :currentSort="currentSort"
                :currentSortDir="currentSortDir"
              />
            </div>
          </TableHead>
        </template>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="trackingBook in trackingBooks" :key="trackingBook.MaTDMS">
        <TableCell
          class="font-medium"
          :class="{ 'text-red-500 ': isRecordExpired(trackingBook['NgayTra']) }"
          >{{ trackingBook.MaTDMS }}</TableCell
        >
        <TableCell
          class=""
          :class="{ 'text-red-500 ': isRecordExpired(trackingBook['NgayTra']) }"
          >{{ trackingBook.Sach.TenSach }}</TableCell
        >
        <TableCell
          class=""
          :class="{ 'text-red-500 ': isRecordExpired(trackingBook['NgayTra']) }"
          >{{ trackingBook.DocGia.HoTen }}</TableCell
        >
        <TableCell
          class=""
          :class="{ 'text-red-500 ': isRecordExpired(trackingBook['NgayTra']) }"
          >{{ formatDateToVietnamese(trackingBook[currentStateInfo.name]) }}</TableCell
        >
        <template v-if="currentState === 'PICKED_UP'">
          <TableCell :class="{ 'text-red-500 ': isRecordExpired(trackingBook['NgayTra']) }">{{
            formatDateToVietnamese(trackingBook['NgayTra'])
          }}</TableCell>
        </template>
        <TableCell class="text-right">
          <template v-if="currentState === 'PENDING' && LoaiTaiKhoan !== 'USER'">
            <Button
              variant="outline"
              class="mr-2"
              size="sm"
              @click="approveOrRejectTrackingBook(trackingBook)"
            >
              <div class="flex flex-row items-center space-x-2">
                <ChevronsRight class="size-4"></ChevronsRight>
                <span> Duyệt đơn</span>
              </div>
            </Button>
          </template>
          <template v-if="currentState === 'APPROVED' && LoaiTaiKhoan !== 'USER'">
            <Button variant="outline" class="mr-2" size="sm" @click="pickUpBook(trackingBook)">
              <div class="flex flex-row items-center space-x-2">
                <BookUp class="size-4"></BookUp>
                <span> Lấy sách</span>
              </div>
            </Button>
          </template>

          <template v-if="currentState === 'PICKED_UP' && LoaiTaiKhoan !== 'USER'">
            <Button variant="outline" class="mr-2" size="sm" @click="returnBook(trackingBook)">
              <div class="flex flex-row items-center space-x-2">
                <Undo2 class="size-4"></Undo2>
                <span> Trả sách</span>
              </div>
            </Button>
          </template>
          <template
            v-if="
              currentState === 'PENDING' || (currentState !== 'PENDING' && LoaiTaiKhoan !== 'USER')
            "
          >
            <Button variant="destructive" size="sm" @click="deleteTrackingBook(trackingBook)">
              <div class="flex flex-row items-center space-x-2">
                <Trash class="size-4"></Trash>
                <span> Xóa</span>
              </div>
            </Button>
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
import { Trash, ChevronUp, ChevronDown, Undo2, BookUp, ChevronsRight } from 'lucide-vue-next'
import { ref } from 'vue'
import { useTrackingBookStore } from '@/stores/useTrackingBookStore'
import { useAuthStore } from '@/stores/useAuthStore'

const currentSort = ref('')
const currentSortDir = ref('asc')

const trackingBookStore = useTrackingBookStore()
const authStore = useAuthStore()

const LoaiTaiKhoan = computed(() => {
  return authStore.getLoaiTaiKhoan()
})

onMounted(async () => {
  if (LoaiTaiKhoan.value === 'USER') {
    const MaDocGia = authStore.getMaDocGIa()
    trackingBookStore.setSearchParams('MaDocGia', MaDocGia)
  }
  await trackingBookStore.fetchTrackingBooks()
})

const currentState = computed(() => {
  return trackingBookStore.getCurrentState() || ''
})

const currentStateInfo = computed(() => {
  return trackingBookStore.getCurrentStateInfo() || {}
})

const trackingBooks = computed(() => {
  return trackingBookStore.trackingBooks
})

const isRecordExpired = (dateString) => {
  const ngayTraDate = new Date(dateString)
  const currentDate = new Date()

  return currentState.value === 'PICKED_UP' && ngayTraDate < currentDate
}

const formatDateToVietnamese = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh'
  }).format(date)
}

const sort = async (column) => {
  if (column === currentSort.value) {
    currentSortDir.value = currentSortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    currentSort.value = column
    currentSortDir.value = 'asc'
  }
  trackingBookStore.setSortParams(currentSort.value, currentSortDir.value)
  await trackingBookStore.fetchTrackingBooks()
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

const emit = defineEmits(['approveOrReject', 'pickUp', 'return', 'delete'])

const approveOrRejectTrackingBook = (trackingBook) => {
  emit('approveOrReject', trackingBook)
}

const pickUpBook = (trackingBook) => {
  emit('pickUp', trackingBook)
}

const returnBook = (trackingBook) => {
  emit('return', trackingBook)
}

const deleteTrackingBook = (trackingBook) => {
  emit('delete', trackingBook)
}
</script>
