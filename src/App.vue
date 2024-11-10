<script setup>
import Toaster from '@/components/ui/toast/Toaster.vue'

import { useAuthStore } from '@/stores/useAuthStore'
import { onMounted } from 'vue'

const authStore = useAuthStore()

onMounted(() => {
  if (!authStore.account || !authStore.token) {
    authStore.fetchAccountInfos()
  }
})
</script>

<template>
  <div class="scroll-smooth">
    <RouterView></RouterView>
  </div>
  <Toaster />
</template>
