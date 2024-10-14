<template>
  <div class="bg-white rounded-lg shadow-lg m-4 p-8">
    <PublisherHeader></PublisherHeader>
  </div>

  <div class="bg-white rounded-lg shadow-lg m-4 p-8">
    <div class="flex flex-row justify-between mb-4">
      <PublisherSearchBar></PublisherSearchBar>
      <PublisherCreateDialog />
    </div>
    <PublisherTable @edit="openUpdateDialog" @delete="openDeleteDialog" />
    <PublisherUpdateDialog ref="updateDialog" />
    <PublisherDeleteDialog ref="deleteDialog"></PublisherDeleteDialog>
  </div>
</template>

<script setup>
import PublisherHeader from './PublisherHeader.vue'
import PublisherTable from './PublisherTable.vue'
import PublisherCreateDialog from './PublisherCreateDialog.vue'
import PublisherUpdateDialog from './PublisherUpdateDialog.vue'
import PublisherDeleteDialog from './PublisherDeleteDialog.vue'
import PublisherSearchBar from './PublisherSearchBar.vue'

import { ref } from 'vue'

const updateDialog = ref(null)
const deleteDialog = ref(null)

const openUpdateDialog = (publisher) => {
  updateDialog.value.openDialog(publisher)
}

const openDeleteDialog = (publisher) => {
  deleteDialog.value.openDialog(publisher)
}
</script>
