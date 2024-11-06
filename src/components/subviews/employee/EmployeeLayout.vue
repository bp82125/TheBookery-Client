<template>
  <div class="bg-white rounded-lg shadow-lg m-4 p-8">
    <EmployeeHeader></EmployeeHeader>
  </div>

  <div class="bg-white rounded-lg shadow-lg m-4 p-8">
    <div class="flex flex-row justify-between mb-4">
      <EmployeeSearchBar></EmployeeSearchBar>
      <EmployeeCreateDialog></EmployeeCreateDialog>
    </div>
    <EmployeeTable @edit="openUpdateDialog" @delete="openDeleteDialog"></EmployeeTable>
    <EmployeeUpdateDialog ref="updateDialog"></EmployeeUpdateDialog>
    <EmployeeDeleteDialog ref="deleteDialog"></EmployeeDeleteDialog>
    <EmployeePagination></EmployeePagination>
  </div>
</template>

<script setup>
import EmployeeHeader from './EmployeeHeader.vue'
import EmployeeTable from './EmployeeTable.vue'
import EmployeeSearchBar from './EmployeeSearchBar.vue'
import EmployeeCreateDialog from './EmployeeCreateDialog.vue'
import EmployeeUpdateDialog from './EmployeeUpdateDialog.vue'
import EmployeeDeleteDialog from './EmployeeDeleteDialog.vue'
import EmployeePagination from './EmployeePagination.vue'

import { ref } from 'vue'

const updateDialog = ref(null)
const deleteDialog = ref(null)

const openUpdateDialog = (employee) => {
  updateDialog.value.openDialog(employee)
}

const openDeleteDialog = (employee) => {
  deleteDialog.value.openDialog(employee)
}
</script>
