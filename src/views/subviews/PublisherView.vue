<script setup>
import PublisherLayout from '@/components/subviews/publisher/PublisherLayout.vue'
import { usePublisherStore } from '@/stores/usePublisherStore'
import { onBeforeRouteLeave } from 'vue-router'

const publisherStore = usePublisherStore()

onBeforeRouteLeave((to, from) => {
  publisherStore.resetStates()
})
</script>

<template>
  <PublisherLayout></PublisherLayout>
</template>
