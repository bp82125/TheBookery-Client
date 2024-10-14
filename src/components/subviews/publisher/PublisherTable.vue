<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead class=""> Mã NXB </TableHead>
        <TableHead>Tên NXB</TableHead>
        <TableHead>Địa chỉ</TableHead>
        <TableHead class="text-right"> Số lượng sách </TableHead>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="publisher in publishers" :key="publisher.MaNXB">
        <TableCell class="font-medium">{{ publisher.MaNXB }}</TableCell>
        <TableCell>{{ publisher.TenNXB }}</TableCell>
        <TableCell>{{ publisher.DiaChi }}</TableCell>
        <TableCell class="text-right">{{ publisher._count.Sach }}</TableCell>
        <TableCell class="text-right">
          <Button variant="outline" size="sm" class="mr-2" @click="editPublisher(publisher)">
            <Pencil class="size-4"></Pencil>
          </Button>
          <Button variant="destructive" size="sm" @click="deletePublisher(publisher)">
            <Trash class="size-4"></Trash
          ></Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup>
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { computed, onMounted } from 'vue'
import { usePublisherStore } from '@/stores/usePublisherStore'
import { Pencil, Trash } from 'lucide-vue-next'

const publisherStore = usePublisherStore()

onMounted(() => {
  publisherStore.fetchPublishers()
})

const publishers = computed(() => publisherStore.publishers)

const emit = defineEmits(['edit', 'delete'])

const editPublisher = (publisher) => {
  emit('edit', publisher)
}

const deletePublisher = (publisher) => {
  emit('delete', publisher)
}
</script>
