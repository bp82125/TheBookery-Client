<script setup>
import BookLayout from '@/components/subviews/book/BookLayout.vue'
import { usePublisherStore } from '@/stores/usePublisherStore'
import { onBeforeRouteLeave } from 'vue-router'

const publisherStore = usePublisherStore()

onBeforeRouteLeave((to, from) => {
  publisherStore.resetStates()
})
</script>

<template>
  <BookLayout></BookLayout>
</template>
