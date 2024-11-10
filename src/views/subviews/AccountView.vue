<script setup>
import AccountLayout from '@/components/subviews/account/AccountLayout.vue'
import { useAccountStore } from '@/stores/useAccountStore'

import { onBeforeRouteLeave } from 'vue-router'

const accountStore = useAccountStore()

onBeforeRouteLeave((to, from) => {
  accountStore.resetStates()
})
</script>

<template>
  <AccountLayout></AccountLayout>
</template>
