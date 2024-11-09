<template>
  <div class="container mx-auto py-4 px-0 mt-8">
    <Tabs defaultValue="PENDING" class="" @update:modelValue="handleTabChange">
      <TabsList class="grid w-full grid-cols-5">
        <TabsTrigger
          value="PENDING"
          class="data-[state=active]:text-blue-500 hover:text-blue-500 py-2"
          ><div class="flex flex-row gap-x-2 items-center">
            <CircleDashed class="w-4 h-4"></CircleDashed><span>{{ stateLabels['PENDING'] }}</span>
          </div></TabsTrigger
        >
        <TabsTrigger
          value="APPROVED"
          class="data-[state=active]:text-blue-500 hover:text-blue-500 py-2"
          ><div class="flex flex-row gap-x-2 items-center">
            <CheckCheck class="w-4 h-4"></CheckCheck><span>{{ stateLabels['APPROVED'] }}</span>
          </div></TabsTrigger
        >
        <TabsTrigger
          value="PICKED_UP"
          class="data-[state=active]:text-blue-500 hover:text-blue-500 py-2"
          ><div class="flex flex-row gap-x-2 items-center">
            <BookUp2 class="w-4 h-4"></BookUp2><span>{{ stateLabels['PICKED_UP'] }}</span>
          </div></TabsTrigger
        >
        <TabsTrigger
          value="RETURNED"
          class="data-[state=active]:text-blue-500 hover:text-blue-500 py-2"
          ><div class="flex flex-row gap-x-2 items-center">
            <BookCheck class="w-4 h-4"></BookCheck><span>{{ stateLabels['RETURNED'] }}</span>
          </div></TabsTrigger
        >
        <TabsTrigger
          value="REJECTED"
          class="data-[state=active]:text-blue-500 hover:text-blue-500 py-2"
          ><div class="flex flex-row gap-x-2 items-center">
            <X class="w-4 h-4"></X><span>{{ stateLabels['REJECTED'] }}</span>
          </div></TabsTrigger
        >
      </TabsList>
    </Tabs>
  </div>
</template>

<script setup>
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTrackingBookStore } from '@/stores/useTrackingBookStore'
import { onMounted } from 'vue'
import { CircleDashed, CheckCheck, X, BookCheck, BookUp2 } from 'lucide-vue-next'

const stateLabels = {
  PENDING: 'Chờ duyệt',
  APPROVED: 'Đã xác nhận',
  PICKED_UP: 'Đã lấy',
  RETURNED: 'Đã trả',
  REJECTED: 'Bị từ chối'
}

const trackingBookStore = useTrackingBookStore()

onMounted(() => {
  trackingBookStore.setSearchParams('TrangThaiMuonSach', 'PENDING')
})

const handleTabChange = async (value) => {
  trackingBookStore.setSearchParams('TrangThaiMuonSach', value)
  await trackingBookStore.fetchTrackingBooks()
}
</script>
