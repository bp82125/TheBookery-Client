<template>
  <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-10">
    Thống kê mượn sách trong 7 ngày qua
  </h3>

  <LineChart :data="chartData" index="date" :categories="categories" :colors="colors" />
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useOverviewStore } from '@/stores/useOverviewStore'
import LineChart from '@/components/ui/chart-line/LineChart.vue'

const overviewStore = useOverviewStore()

const categories = ['Chờ duyệt', 'Đã duyệt', 'Bị từ chối', 'Đã lấy sách', 'Đã trả sách']

const colors = [
  'rgb(255, 159, 64)', // Orange for 'Chờ duyệt'
  'rgb(75, 192, 192)', // Teal for 'Đã duyệt'
  'rgb(255, 99, 132)', // Pink for 'Bị từ chối'
  'rgb(54, 162, 235)', // Blue for 'Đã lấy sách'
  'rgb(153, 102, 255)' // Purple for 'Đã trả sách'
]

onMounted(async () => {
  await overviewStore.fetchChartData()
})

const chartData = computed(() => {
  return overviewStore.chartData
})
</script>
