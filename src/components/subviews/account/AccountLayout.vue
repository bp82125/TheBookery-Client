<template>
  <div class="bg-white rounded-lg shadow-lg m-4 p-8">
    <AccountHeader></AccountHeader>
  </div>
  <div class="bg-white rounded-lg shadow-lg m-4 p-8">
    <div class="flex flex-row justify-between mb-4">
      <AccountSearchBar></AccountSearchBar>
    </div>
    <AccountTable
      @delete="openDeleteDialog"
      @toggle="openToggleDialog"
      @resetPassword="openResetPasswordDialog"
    ></AccountTable>
    <AccountToggleDialog ref="toggleDialog"></AccountToggleDialog>
    <AccountDeleteDialog ref="deleteDialog"></AccountDeleteDialog>
    <AccountResetPasswordDialog ref="resetPasswordDialog"></AccountResetPasswordDialog>
    <AccountPagination></AccountPagination>
  </div>
</template>

<script setup>
import AccountHeader from './AccountHeader.vue'
import AccountTable from './AccountTable.vue'
import AccountSearchBar from './AccountSearchBar.vue'
import AccountDeleteDialog from './AccountDeleteDialog.vue'
import AccountToggleDialog from './AccountToggleDialog.vue'
import AccountResetPasswordDialog from './AccountResetPasswordDialog.vue'
import AccountPagination from './AccountPagination.vue'

import { ref } from 'vue'

const toggleDialog = ref(null)
const deleteDialog = ref(null)
const resetPasswordDialog = ref(null)

const openToggleDialog = (account) => {
  toggleDialog.value.openDialog(account)
}

const openDeleteDialog = (account) => {
  deleteDialog.value.openDialog(account)
}

const openResetPasswordDialog = (account) => {
  resetPasswordDialog.value.openDialog(account)
}
</script>
