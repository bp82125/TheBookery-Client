<template>
  <Table class="overflow-scroll">
    <TableHeader>
      <TableRow>
        <TableHead @click="sort('MaNXB')" class="cursor-pointer">
          <div class="flex items-center">
            <span> Mã NXB</span>
            <SortIcon
              :column="'MaNXB'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>
        <TableHead @click="sort('TenNXB')" class="cursor-pointer">
          <div class="flex items-center">
            <span> Tên NXB</span>
            <SortIcon
              :column="'TenNXB'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>
        <TableHead @click="sort('DiaChi')" class="cursor-pointer">
          <div class="flex items-center">
            <span> Địa chỉ</span>
            <SortIcon
              :column="'DiaChi'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>
        <TableHead @click="sort('Sach._count')" class="cursor-pointer text-right">
          <div class="flex items-center justify-end">
            <span>Số lượng sách</span>
            <SortIcon
              :column="'Sach._count'"
              :currentSort="currentSort"
              :currentSortDir="currentSortDir"
            />
          </div>
        </TableHead>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="publisher in publishers" :key="publisher.MaNXB">
        <TableCell class="font-medium">{{ publisher.MaNXB }}</TableCell>
        <TableCell class="">{{ publisher.TenNXB }}</TableCell>
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
import { computed, onMounted, defineComponent, h } from 'vue'
import { usePublisherStore } from '@/stores/usePublisherStore'
import { Pencil, Trash, ChevronUp, ChevronDown, Lock } from 'lucide-vue-next'
import { ref } from 'vue'

const currentSort = ref('')
const currentSortDir = ref('asc')

const publisherStore = usePublisherStore()

onMounted(async () => {
  await publisherStore.fetchPublishers()
})

const nonSortableColumns = ['MaNXB']

const publishers = computed(() => publisherStore.publishers)

const sort = async (column) => {
  if (nonSortableColumns.includes(column)) {
    currentSort.value = column
    currentSortDir.value = 'asc'
    return
  }

  if (column === currentSort.value) {
    currentSortDir.value = currentSortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    currentSort.value = column
    currentSortDir.value = 'asc'
  }
  publisherStore.setSortParams(currentSort.value, currentSortDir.value)
  await publisherStore.fetchPublishers()
}

const SortIcon = defineComponent({
  props: ['column', 'currentSort', 'currentSortDir'],
  setup(props) {
    return () => {
      if (props.column !== props.currentSort) {
        return null
      }

      if (nonSortableColumns.includes(props.column)) {
        return h(Lock, { class: 'ml-1 text-gray-500 size-4' })
      }

      return h(props.currentSortDir === 'asc' ? ChevronUp : ChevronDown, {
        class: 'inline-block ml-1 size-4'
      })
    }
  }
})

const emit = defineEmits(['edit', 'delete'])

const editPublisher = (publisher) => {
  emit('edit', publisher)
}

const deletePublisher = (publisher) => {
  emit('delete', publisher)
}
</script>
