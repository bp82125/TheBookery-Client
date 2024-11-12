<template>
  <div class="container mx-auto py-4 px-0 mt-8">
    <Tabs defaultValue="PENDING" @update:modelValue="handleTabChange">
      <TabsList class="grid w-full grid-cols-5">
        <TabsTrigger
          v-for="(state, key) in stateLabels"
          :key="key"
          :value="key"
          class="data-[state=active]:text-blue-500 hover:text-blue-500 py-2"
        >
          <div class="flex flex-row gap-x-2 items-center">
            <template v-if="currentState === key">
              <component :is="state.icon" class="w-4 h-4" />
            </template>
            <span>{{ state.label }}</span>
          </div>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
</template>

<script setup>
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTrackingBookStore } from '@/stores/useTrackingBookStore'
import { computed, onMounted } from 'vue'
import { CircleDashed, CheckCheck, BookX, BookCheck, BookUp2 } from 'lucide-vue-next'

const stateLabels = {
  PENDING: { label: 'Chờ duyệt', icon: CircleDashed },
  APPROVED: { label: 'Đã xác nhận', icon: CheckCheck },
  PICKED_UP: { label: 'Đã lấy', icon: BookUp2 },
  RETURNED: { label: 'Đã trả', icon: BookCheck },
  REJECTED: { label: 'Bị từ chối', icon: BookX }
}

const trackingBookStore = useTrackingBookStore()

const currentState = computed(() => {
  return trackingBookStore.searchParams.TrangThaiMuonSach
})

onMounted(() => {
  trackingBookStore.setSearchParams('TrangThaiMuonSach', 'PENDING')
})

const handleTabChange = async (value) => {
  trackingBookStore.setSearchParams('TrangThaiMuonSach', value)
  await trackingBookStore.fetchTrackingBooks()
}
</script>
