<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <DialogTitle>Xóa đọc giả</DialogTitle>
      </DialogHeader>
      <div class="flex justify-center">
        <CircleAlert class="size-20 text-gray-300"></CircleAlert>
      </div>

      <DialogDescription class="mb-3">
        Bạn có chắc là muốn xóa đọc giả <b>{{ HoTen }}</b> không? Hành động này không thể hoàn tác.
      </DialogDescription>
      <DialogFooter class="w-full">
        <Button variant="outline" @click="closeDialog" class="w-full">Hủy</Button>
        <Button variant="destructive" @click="handleDelete" class="w-full">Xóa</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CircleAlert } from 'lucide-vue-next'

import { ref } from 'vue'
import { useReaderStore } from '@/stores/useReaderStore'

const readerStore = useReaderStore()
const dialogOpen = ref(false)

const id = ref('')
const HoTen = ref('')

const openDialog = (reader) => {
  id.value = reader.MaDocGia
  HoTen.value = reader.HoLot + ' ' + reader.Ten
  dialogOpen.value = true
}

const closeDialog = () => {
  dialogOpen.value = false
}

const handleDelete = () => {
  readerStore.deleteReader(id.value)
  closeDialog()
}

defineExpose({ openDialog })
</script>
