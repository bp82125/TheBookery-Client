<script setup>
import { RouterLink } from 'vue-router'
import { ScrollArea } from '@/components/ui/scroll-area'
import { navItems } from '@/configs/navigations'

defineProps({
  isOpen: Boolean
})
</script>

<template>
  <ScrollArea class="flex-1">
    <nav class="space-y-2 p-2">
      <RouterLink
        v-for="item in navItems"
        :key="item.name"
        :to="item.route"
        custom
        v-slot="{ isActive, href, navigate }"
      >
        <a
          :href="href"
          @click="navigate"
          class="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors"
          :class="{
            'bg-primary text-primary-foreground': isActive,
            'hover:bg-accent hover:text-accent-foreground': !isActive,
            'justify-center': !isOpen
          }"
        >
          <component :is="item.icon" class="h-5 w-5" :class="isOpen ? 'mx-2' : ''" />
          <span v-if="isOpen">{{ item.name }}</span>
        </a>
      </RouterLink>
    </nav>
  </ScrollArea>
</template>
