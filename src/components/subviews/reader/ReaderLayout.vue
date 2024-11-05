<template>
  <div class="bg-white rounded-lg shadow-lg m-4 p-8">
    <ReaderHeader></ReaderHeader>
  </div>

  <div class="bg-white rounded-lg shadow-lg m-4 p-8">
    <div class="flex flex-row justify-between mb-4">
      <ReaderSearchBar></ReaderSearchBar>
      <ReaderCreateDialog></ReaderCreateDialog>
    </div>
    <ReaderTable @edit="openUpdateDialog" @delete="openDeleteDialog"></ReaderTable>
    <ReaderPagination></ReaderPagination>
    <ReaderUpdateDialog ref="updateDialog"></ReaderUpdateDialog>
    <ReaderDeleteDialog ref="deleteDialog"></ReaderDeleteDialog>
  </div>
</template>

<script setup>
import ReaderHeader from './ReaderHeader.vue'
import ReaderSearchBar from './ReaderSearchBar.vue'
import ReaderTable from './ReaderTable.vue'
import ReaderDeleteDialog from './ReaderDeleteDialog.vue'
import ReaderUpdateDialog from './ReaderUpdateDialog.vue'
import ReaderCreateDialog from './ReaderCreateDialog.vue'
import ReaderPagination from './ReaderPagination.vue'

import { ref } from 'vue'

const updateDialog = ref(null)
const deleteDialog = ref(null)

const openUpdateDialog = (reader) => {
  updateDialog.value.openDialog(reader)
}

const openDeleteDialog = (reader) => {
  deleteDialog.value.openDialog(reader)
}
</script>
