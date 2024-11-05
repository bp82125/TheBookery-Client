<script setup>
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
  <div class="scroll-smooth">
    <RouterView></RouterView>
  </div>
  <Toaster />
</template>
