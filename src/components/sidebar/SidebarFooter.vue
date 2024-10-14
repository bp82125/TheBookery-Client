<script setup>
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-vue-next'

defineProps({
  isOpen: Boolean
})
</script>

<template>
  <div class="p-4">
    <Button variant="outline" class="w-full flex items-center" :class="isOpen ? 'p-4' : 'p-0'">
      <Settings class="h-4 w-4" />
      <span v-if="isOpen" class="ml-3">Cài đặt</span>
    </Button>
  </div>
</template>
