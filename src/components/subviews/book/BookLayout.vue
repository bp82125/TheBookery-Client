<template>
  <div class="bg-white rounded-lg shadow-lg m-4 p-8"><BookHeader></BookHeader></div>
  <div class="bg-white rounded-lg shadow-lg m-4 p-8">
    <div class="flex flex-row justify-between mb-4">
      <BookCreateDialog></BookCreateDialog>
    </div>
    <BookGrid></BookGrid>
    <BookPagination></BookPagination>
  </div>
</template>

<script setup>
import BookHeader from './BookHeader.vue'
import BookGrid from './BookGrid.vue'
import BookPagination from './BookPagination.vue'
import BookCreateDialog from './BookCreateDialog.vue'
</script>
