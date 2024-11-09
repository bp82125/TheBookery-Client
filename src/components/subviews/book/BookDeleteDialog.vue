<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <DialogTitle>Xóa sách</DialogTitle>
      </DialogHeader>
      <div class="flex justify-center">
        <CircleAlert class="size-20 text-gray-300"></CircleAlert>
      </div>

      <DialogDescription class="mb-3">
        Bạn có chắc là muốn xóa sách <b>{{ TenSach }}</b> không?
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
import { useBookStore } from '@/stores/useBookStore'

const { toast } = useToast()

const bookStore = useBookStore()
const dialogOpen = ref(false)

const id = ref('')
const TenSach = ref('')

const openDialog = (sach) => {
  id.value = sach.MaSach
  TenSach.value = sach.TenSach
  dialogOpen.value = true
}

const closeDialog = () => {
  dialogOpen.value = false
}

const handleDelete = () => {
  bookStore.deleteBook(id.value)
  toast({
    title: 'Xóa sách',
    description: `Sách ${TenSach.value} đã được xóa thành công`
  })
  closeDialog()
}

defineExpose({ openDialog })
</script>
