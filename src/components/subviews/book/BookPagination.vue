<template>
  <div class="px-4 mt-8">
    <template v-if="total_records <= 0">
      <div class="flex justify-center my-8">
        <span class="italic">Không tìm thấy quyển sách nào</span>
      </div>
    </template>
    <div class="flex justify-end">
      <span
        >Trên tổng số <b>{{ total_records }}</b> sách</span
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
import { useBookStore } from '@/stores/useBookStore'

const bookStore = useBookStore()

const limitOptions = [10, 20, 50, 100]
const limit = ref(bookStore.paginationParams.limit.toString())

const currentPage = ref(bookStore.paginationParams.page)

const total_pages = computed(() => {
  return bookStore.pagination.total_pages * limit.value
})

const total_records = computed(() => {
  return bookStore.pagination.total_records
})

async function onPageChange(newPage) {
  bookStore.setPaginationParams(newPage, Number(limit.value))
  await bookStore.fetchBooks()
}

function getLimitLabel(limit) {
  return `Giới hạn: ${limit}`
}

watch(limit, async (newLimit) => {
  bookStore.setPaginationParams(1, Number(newLimit))
  await bookStore.fetchBooks()
})
</script>
