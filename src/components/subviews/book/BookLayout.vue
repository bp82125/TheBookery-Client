<template>
  <div class="bg-white rounded-lg shadow-lg m-4 p-8"><BookHeader></BookHeader></div>
  <div class="bg-white rounded-lg shadow-lg m-4 p-8">
    <div class="flex flex-row justify-between mb-8">
      <BookSearchBar></BookSearchBar>
      <div
        class="ml-2 w-full flex"
        :class="LoaiTaiKhoan !== 'USER' ? 'justify-start' : 'justify-end'"
      >
        <BookSorting></BookSorting>
      </div>

      <BookCreateDialog></BookCreateDialog>
    </div>
    <BookGrid
      @edit="openUpdateDialog"
      @delete="openDeleteDialog"
      @borrow="openBorrowDialog"
    ></BookGrid>
    <BookPagination></BookPagination>
    <BookUpdateDialog ref="updateDialog"></BookUpdateDialog>
    <BookDeleteDialog ref="deleteDialog"></BookDeleteDialog>
    <BookBorrowingDialog ref="borrowDialog"></BookBorrowingDialog>
  </div>
</template>

<script setup>
import BookHeader from './BookHeader.vue'
import BookGrid from './BookGrid.vue'
import BookPagination from './BookPagination.vue'
import BookCreateDialog from './BookCreateDialog.vue'
import BookSearchBar from './BookSearchBar.vue'
import BookUpdateDialog from './BookUpdateDialog.vue'
import BookDeleteDialog from './BookDeleteDialog.vue'
import BookSorting from './BookSorting.vue'
import BookBorrowingDialog from './BookBorrowingDialog.vue'

import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'

const updateDialog = ref(null)
const deleteDialog = ref(null)
const borrowDialog = ref(null)

const authStore = useAuthStore()

const LoaiTaiKhoan = computed(() => {
  return authStore.getLoaiTaiKhoan()
})

const openUpdateDialog = (book) => {
  updateDialog.value.openDialog(book)
}

const openDeleteDialog = (book) => {
  deleteDialog.value.openDialog(book)
}

const openBorrowDialog = (book) => {
  borrowDialog.value.openDialog(book)
}
</script>
