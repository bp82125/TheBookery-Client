<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="max-w-sm">
      <DialogHeader>
        <DialogTitle>Xóa nhà xuất bản</DialogTitle>
      </DialogHeader>
      <div class="flex justify-center">
        <CircleAlert class="size-20 text-gray-300"></CircleAlert>
      </div>

      <DialogDescription class="mb-3">
        Bạn có chắc là muốn xóa <b>{{ TenNXB }}</b> không? Hành động này không thể hoàn tác.
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
import { usePublisherStore } from '@/stores/usePublisherStore'
import { useToast } from '@/components/ui/toast'

const { toast } = useToast()

const publisherStore = usePublisherStore()
const dialogOpen = ref(false)

const id = ref('')
const TenNXB = ref('')

const openDialog = (publisher) => {
  id.value = publisher.MaNXB
  TenNXB.value = publisher.TenNXB
  dialogOpen.value = true
}

const closeDialog = () => {
  dialogOpen.value = false
}

const handleDelete = () => {
  publisherStore.deletePublisher(id.value)
  toast({
    title: 'Xóa nhà xuất bản',
    description: `${TenNXB.value} đã được xóa thành công`
  })
  closeDialog()
}

defineExpose({ openDialog })
</script>
