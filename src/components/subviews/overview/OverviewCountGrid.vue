<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <OverviewCountBlock
      v-for="(count, type) in counts"
      :key="type"
      :name="names[type]"
      :count="count"
      :type="type"
      :description="descriptions[type]"
    />
  </div>
</template>

<script setup>
import OverviewCountBlock from './OverviewCountBlock.vue'
import { computed, onMounted } from 'vue'
import { useOverviewStore } from '@/stores/useOverviewStore'

const overviewStore = useOverviewStore()

onMounted(() => {
  overviewStore.fetchCounts()
})

const counts = computed(() => overviewStore.counts)

const names = {
  sach: 'Sách',
  docGia: 'Đọc Giả',
  nhanVien: 'Nhân Viên',
  theoDoiMuonSach: 'Mượn Sách'
}

const descriptions = {
  sach: 'Tổng số sách trong thư viện',
  docGia: 'Số lượng đọc giả đăng ký',
  nhanVien: 'Tổng số nhân viên thư viện',
  theoDoiMuonSach: 'Số đơn mượn sách trong hệ thống'
}
</script>
