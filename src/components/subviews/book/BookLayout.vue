<template>
  <div class="bg-white rounded-lg shadow-lg m-4 p-8"><BookHeader></BookHeader></div>
  <div class="bg-white rounded-lg shadow-lg m-4 p-8">
    <div class="flex flex-row justify-between mb-8">
      <BookSearchBar></BookSearchBar>
      <BookSorting></BookSorting>

      <BookCreateDialog></BookCreateDialog>
    </div>
    <BookGrid @edit="openUpdateDialog" @delete="openDeleteDialog"></BookGrid>
    <BookPagination></BookPagination>
    <BookUpdateDialog ref="updateDialog"></BookUpdateDialog>
    <BookDeleteDialog ref="deleteDialog"></BookDeleteDialog>
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

import { ref } from 'vue'

const updateDialog = ref(null)
const deleteDialog = ref(null)

const openUpdateDialog = (book) => {
  updateDialog.value.openDialog(book)
}

const openDeleteDialog = (book) => {
  deleteDialog.value.openDialog(book)
}
</script>
