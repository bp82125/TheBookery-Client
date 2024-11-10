<template>
  <div class="bg-white rounded-lg shadow-lg m-4 px-8 pt-8">
    <TrackingBookHeader></TrackingBookHeader>
    <TrackingBookTab></TrackingBookTab>
  </div>

  <div class="bg-white rounded-lg shadow-lg m-4 p-8">
    <div class="flex flex-row justify-between mt-8 mb-4">
      <TrackingBookSearchBar></TrackingBookSearchBar>
      <template v-if="LoaiTaiKhoan !== 'USER'">
        <TrackingBookCreateDialog></TrackingBookCreateDialog>
      </template>
    </div>
    <TrackingBookTable
      @delete="openDeleteDialog"
      @approveOrReject="openApproveOrRejectDialog"
      @pickUp="openPickUpDialog"
      @return="openReturnDialog"
    ></TrackingBookTable>
    <TrackingBookDeteleDialog ref="deleteDialog"></TrackingBookDeteleDialog>
    <TrackingBookApproveOrRejectDialog
      ref="approveOrRejectDialog"
    ></TrackingBookApproveOrRejectDialog>
    <TrackingBookPickUpDialog ref="pickUpDialog"></TrackingBookPickUpDialog>
    <TrackingBookReturnDialog ref="returnDialog"></TrackingBookReturnDialog>
    <TrackingBookPagination></TrackingBookPagination>
  </div>
</template>

<script setup>
import TrackingBookHeader from './TrackingBookHeader.vue'
import TrackingBookTab from './TrackingBookTab.vue'
import TrackingBookTable from './TrackingBookTable.vue'
import TrackingBookSearchBar from './TrackingBookSearchBar.vue'
import TrackingBookDeteleDialog from './TrackingBookDeteleDialog.vue'
import TrackingBookApproveOrRejectDialog from './TrackingBookApproveOrRejectDialog.vue'
import TrackingBookPickUpDialog from './TrackingBookPickUpDialog.vue'
import TrackingBookReturnDialog from './TrackingBookReturnDialog.vue'
import TrackingBookPagination from './TrackingBookPagination.vue'
import TrackingBookCreateDialog from './TrackingBookCreateDialog.vue'

import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()

const LoaiTaiKhoan = computed(() => {
  return authStore.getLoaiTaiKhoan()
})

const deleteDialog = ref(null)
const approveOrRejectDialog = ref(null)
const pickUpDialog = ref(null)
const returnDialog = ref(null)

const openDeleteDialog = (trackingBook) => {
  deleteDialog.value.openDialog(trackingBook)
}

const openApproveOrRejectDialog = (trackingBook) => {
  approveOrRejectDialog.value.openDialog(trackingBook)
}

const openPickUpDialog = (trackingBook) => {
  pickUpDialog.value.openDialog(trackingBook)
}

const openReturnDialog = (trackingBook) => {
  returnDialog.value.openDialog(trackingBook)
}
</script>
