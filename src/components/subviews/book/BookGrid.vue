<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <BookCard
      v-for="book in books"
      :key="book.MaSach"
      :book="book"
      @edit="openUpdateDialog"
      @delete="openDeleteDialog"
      @borrow="openBorrowDialog"
    />
  </div>
</template>

<script setup>
import BookCard from './BookCard.vue'

import { onMounted, computed } from 'vue'

import { useBookStore } from '@/stores/useBookStore'

const bookStore = useBookStore()

onMounted(() => {
  bookStore.fetchBooks()
})

const books = computed(() => {
  return bookStore.books
})

const emit = defineEmits(['edit', 'delete', 'borrow'])

const openUpdateDialog = (book) => {
  emit('edit', book)
}

const openDeleteDialog = (book) => {
  emit('delete', book)
}

const openBorrowDialog = (book) => {
  emit('borrow', book)
}
</script>
