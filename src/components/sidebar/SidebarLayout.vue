<script setup>
import { ref } from 'vue'
import SidebarHeader from './SidebarHeader.vue'
import SidebarNav from './SidebarNav.vue'
import SidebarFooter from './SidebarFooter.vue'

const isOpen = ref(true)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <aside
    class="flex flex-col h-screen bg-background border-r transition-all duration-300 ease-in-out shadow-lg"
    :class="{ 'w-64': isOpen, 'w-20': !isOpen }"
  >
    <SidebarHeader :is-open="isOpen" @toggle="toggleSidebar" />
    <SidebarNav :is-open="isOpen" />
    <SidebarFooter :is-open="isOpen" />
  </aside>
</template>
