<script setup>
import EmployeeLayout from '@/components/subviews/employee/EmployeeLayout.vue'
import { useEmployeeStore } from '@/stores/useEmployeeStore'

import { onBeforeRouteLeave } from 'vue-router'

const employeeStore = useEmployeeStore()

onBeforeRouteLeave((to, from) => {
  employeeStore.resetStates()
})
</script>

<template>
  <EmployeeLayout></EmployeeLayout>
</template>
