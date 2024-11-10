<template>
  <TrackingBookLayout></TrackingBookLayout>
</template>

<script setup>
import { onBeforeRouteLeave } from 'vue-router'
import { useBookStore } from '@/stores/useBookStore'
import { useReaderStore } from '@/stores/useReaderStore'

import TrackingBookLayout from '@/components/subviews/trackingBook/TrackingBookLayout.vue'
import { useTrackingBookStore } from '@/stores/useTrackingBookStore'

const bookStore = useBookStore()
const readerStore = useReaderStore()
const trackingBookStore = useTrackingBookStore()

onBeforeRouteLeave(async (to, from, next) => {
  bookStore.resetStates()
  readerStore.resetStates()
  trackingBookStore.resetStates()

  next()
})
</script>
