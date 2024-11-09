<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <DialogTitle>Xác nhận trả sách</DialogTitle>
      </DialogHeader>
      <div class="flex justify-center mb-4">
        <BookCheck class="size-20 text-gray-300 my-8" />
      </div>
      <DialogDescription class="mb-1">
        Bạn có chắc là muốn xác nhận việc trả sách <b>{{ TenSach }}</b> của đọc giả
        <b>{{ HoTen }}</b> không?
      </DialogDescription>
      <DialogDescription class="mb-3"> Hành động này không thể hoàn tác. </DialogDescription>
      <DialogFooter class="w-full">
        <Button variant="outline" @click="closeDialog" class="w-full">Hủy</Button>
        <Button @click="handleReturn" class="w-full">Trả sách</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from '@/components/ui/toast'
import { useTrackingBookStore } from '@/stores/useTrackingBookStore'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

import { BookCheck } from 'lucide-vue-next'

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

const handleReturn = async () => {
  try {
    await trackingBookStore.returnBook(id.value)
    toast({
      title: 'Xác nhận lấy sách',
      description: `Sách ${TenSach.value} đã được đọc giả ${HoTen.value} trả về thành công.`
    })
    closeDialog()
  } catch (error) {
    console.error('An error occurred during book pickup confirmation:', error)
    toast({
      title: 'Lỗi',
      variant: 'destructive',
      description: 'Đã xảy ra lỗi khi xác nhận trả sách. Vui lòng thử lại.'
    })
  }
}

defineExpose({ openDialog })
</script>
