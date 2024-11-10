<script setup>
import ReaderLayout from '@/components/subviews/reader/ReaderLayout.vue'
import { useReaderStore } from '@/stores/useReaderStore'

import { onBeforeRouteLeave } from 'vue-router'

const readerStore = useReaderStore()

onBeforeRouteLeave((to, from) => {
  readerStore.resetStates()
})
</script>

<template>
  <ReaderLayout></ReaderLayout>
</template>
