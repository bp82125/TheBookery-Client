<template>
  <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-10">
    Các đơn mượn sách có thay đổi gần đây
  </h3>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Đọc giả</TableHead>
        <TableHead>Sách</TableHead>
        <TableHead>Trạng thái</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="TDMS in recentTDMS" :key="TDMS.MaTDMS">
        <TableCell>{{ TDMS.DocGia.HoTen }}</TableCell>
        <TableCell>{{ TDMS.Sach.TenSach }}</TableCell>
        <TableCell :class="getStatusColor(TDMS.TrangThaiMuonSach)">
          {{ getStatusLabel(TDMS.TrangThaiMuonSach) }}
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

import { useOverviewStore } from '@/stores/useOverviewStore'
import { computed, onMounted } from 'vue'

const overviewStore = useOverviewStore()

onMounted(async () => {
  await overviewStore.fetchRecentTDMS()
})

const recentTDMS = computed(() => {
  return overviewStore.recentTDMS
})

const getStatusColor = (status) => {
  switch (status) {
    case 'RETURNED':
      return 'text-purple-600' // Purple for 'Đã trả sách'
    case 'PICKED_UP':
      return 'text-blue-500' // Blue for 'Đã lấy sách'
    case 'REJECTED':
      return 'text-rose-600' // Pink for 'Bị từ chối'
    case 'APPROVED':
      return 'text-teal-500' // Teal for 'Đã duyệt'
    default:
      return 'text-orange-600' // Orange for 'Chờ duyệt'
  }
}

const getStatusLabel = (status) => {
  switch (status) {
    case 'PENDING':
      return 'Chờ duyệt'
    case 'APPROVED':
      return 'Đã duyệt'
    case 'REJECTED':
      return 'Đã từ chối'
    case 'PICKED_UP':
      return 'Đã lấy sách'
    case 'RETURNED':
      return 'Đã trả sách'
    default:
      return 'N/A'
  }
}
</script>
