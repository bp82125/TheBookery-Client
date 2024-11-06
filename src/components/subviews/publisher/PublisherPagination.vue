<template>
  <div class="px-4">
    <div class="flex justify-end">
      <span
        >Trên tổng số <b>{{ total_records }}</b> nhà xuất bản</span
      >
    </div>
    <div class="flex items-center justify-between mt-8">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button class="flex items-center space-x-2" variant="outline">
            <span>{{ getLimitLabel(limit) }}</span>
            <ChevronsUpDown class="w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-32">
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup v-model="limit">
            <DropdownMenuRadioItem
              v-for="option in limitOptions"
              :key="option"
              :value="option.toString()"
            >
              {{ option }}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Pagination
        v-slot="{ page }"
        :total="total_pages"
        v-model:page="currentPage"
        :default-page="1"
        :itemsPerPage="limit"
        :sibling-count="1"
        show-edges
        class="flex items-center justify-between"
        @update:page="onPageChange"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst />
          <PaginationPrev />

          <template v-for="(item, index) in items" :key="index">
            <PaginationListItem v-if="item.type === 'page'" :value="item.value" as-child>
              <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :index="index" />
          </template>

          <PaginationNext />
          <PaginationLast />
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>

<script setup>
import { usePublisherStore } from '@/stores/usePublisherStore'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev
} from '@/components/ui/pagination'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from '@/components/ui/dropdown-menu'
import { ChevronsUpDown } from 'lucide-vue-next'

import { ref, watch, computed } from 'vue'

const publisherStore = usePublisherStore()
const limitOptions = [5, 10, 20, 50, 100]
const limit = ref(publisherStore.paginationParams.limit.toString())

const currentPage = ref()

const total_pages = computed(() => {
  return publisherStore.pagination.total_pages * limit.value
})

const total_records = computed(() => {
  return publisherStore.pagination.total_records
})

async function onPageChange(newPage) {
  publisherStore.setPaginationParams(newPage, Number(limit.value))
  await publisherStore.fetchPublishers()
}

function getLimitLabel(limit) {
  return `Giới hạn: ${limit}`
}

watch(limit, async (newLimit) => {
  publisherStore.setPaginationParams(1, Number(newLimit))
  await publisherStore.fetchPublishers()
})
</script>
