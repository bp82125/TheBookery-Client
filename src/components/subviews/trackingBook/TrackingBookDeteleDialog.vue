<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <DialogTitle>Xóa đơn mượn sách</DialogTitle>
      </DialogHeader>
      <div class="flex justify-center">
        <CircleAlert class="size-20 text-gray-300 my-8"></CircleAlert>
      </div>

      <DialogDescription class="mb-1">
        Bạn có chắc là muốn xóa đơn mượn sách <b>{{ TenSach }}</b> của đọc giả
        <b>{{ HoTen }}</b> không?
      </DialogDescription>
      <DialogDescription class="mb-3"> Hành động này không thể hoàn tác. </DialogDescription>
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
import { useToast } from '@/components/ui/toast'
import { useTrackingBookStore } from '@/stores/useTrackingBookStore'

const { toast } = useToast()

const trackingBookStore = useTrackingBookStore()
const dialogOpen = ref(false)

const id = ref('')
const TenSach = ref('')
const HoTen = ref('')

const openDialog = (trackingBook) => {
  id.value = trackingBook.MaTDMS
  TenSach.value = trackingBook.Sach.TenSach
  HoTen.value = trackingBook.DocGia.HoTen
  dialogOpen.value = true
}

const closeDialog = () => {
  dialogOpen.value = false
}

const handleDelete = () => {
  trackingBookStore.deleteTrackingBook(id.value)
  toast({
    title: 'Xóa đơn mượn sách',
    description: `Đơn mượn sách ${TenSach.value} của đọc giả ${HoTen.value} đã được xóa thành công`
  })
  closeDialog()
}

defineExpose({ openDialog })
</script>
