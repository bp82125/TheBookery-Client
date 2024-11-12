<template>
  <div class="bg-white rounded-lg shadow-lg m-4 p-8">
    <OverviewHeader></OverviewHeader>
  </div>

  <div class="rounded-lg m-4">
    <OverviewCountGrid></OverviewCountGrid>
  </div>

  <div class="grid grid-cols-2 m-4 gap-x-4">
    <div class="w-full border p-8 bg-white rounded-lg shadow-lg">
      <OverviewChart></OverviewChart>
    </div>
    <div class="w-full border p-8 bg-white rounded-lg shadow-lg">
      <OverviewRecentlyTable></OverviewRecentlyTable>
    </div>
  </div>
</template>

<script setup>
import OverviewHeader from './OverviewHeader.vue'
import OverviewCountGrid from './OverviewCountGrid.vue'
import OverviewChart from './OverviewChart.vue'
import OverviewRecentlyTable from './OverviewRecentlyTable.vue'
</script>
