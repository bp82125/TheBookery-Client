<template>
  <TrackingBookLayout></TrackingBookLayout>
</template>

<script setup>
import { onBeforeRouteLeave } from 'vue-router'
import { useBookStore } from '@/stores/useBookStore'
import { useReaderStore } from '@/stores/useReaderStore'

import TrackingBookLayout from '@/components/subviews/trackingBook/TrackingBookLayout.vue'

const bookStore = useBookStore()
const readerStore = useReaderStore()

onBeforeRouteLeave(async (to, from, next) => {
  bookStore.resetStates()
  readerStore.resetStates()

  next()
})
</script>
