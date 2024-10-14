<script setup>
import { Button } from '@/components/ui/button'
import { MenuIcon, XIcon } from 'lucide-vue-next'

defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['toggle'])
</script>

<template>
  <div class="p-4 flex items-center" :class="isOpen ? 'justify-between' : 'justify-center'">
    <h2 class="font-semibold text-lg" :class="{ hidden: !isOpen }">The Bookery</h2>
    <Button variant="ghost" size="icon" @click="emit('toggle')">
      <MenuIcon v-if="!isOpen" class="h-6 w-6" />
      <XIcon v-else class="h-6 w-6" />
    </Button>
  </div>
</template>
