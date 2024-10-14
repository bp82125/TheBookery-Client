<script setup>
import SidebarLayout from '@/components/sidebar/SidebarLayout.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex h-screen">
    <SidebarLayout></SidebarLayout>
    <main class="flex-1 p-2 bg-slate-100">
      <RouterView></RouterView>
    </main>
  </div>
</template>
