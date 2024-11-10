<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <DialogTitle>Yêu cầu mượn sách</DialogTitle>
      </DialogHeader>
      <div class="flex justify-center">
        <CircleAlert class="size-20 text-gray-300"></CircleAlert>
      </div>

      <DialogDescription class="mb-3">
        Bạn có chắc là tạo yêu cầu mượn sách <b>{{ TenSach }}</b> không?
      </DialogDescription>
      <DialogDescription class="mb-3">
        Yêu cầu này có thể hủy trong phần <b>Theo dõi mượn sách</b>.
      </DialogDescription>
      <DialogFooter class="w-full">
        <Button variant="outline" @click="closeDialog" class="w-full">Hủy</Button>
        <Button @click="handleBorrowing" class="w-full">
          {{ isSubmitting ? 'Đang xử lý...' : 'Thêm' }}</Button
        >
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

import { computed, ref } from 'vue'
import { useToast } from '@/components/ui/toast'
import { useTrackingBookStore } from '@/stores/useTrackingBookStore'
import { useAuthStore } from '@/stores/useAuthStore'

const { toast } = useToast()

const trackingBookStore = useTrackingBookStore()
const authStore = useAuthStore()

const dialogOpen = ref(false)
const isSubmitting = ref(false)

const MaSach = ref('')
const TenSach = ref('')
const MaDocGia = computed(() => {
  return authStore.account.DocGia.MaDocGia
})

const openDialog = (sach) => {
  MaSach.value = sach.MaSach
  TenSach.value = sach.TenSach
  dialogOpen.value = true
}

const closeDialog = () => {
  dialogOpen.value = false
}

const handleBorrowing = async () => {
  isSubmitting.value = true

  const response = await trackingBookStore.createTrackingBook(MaDocGia.value, MaSach.value)
  isSubmitting.value = false
  if (response.data.success) {
    toast({
      title: 'Đơn mượn sách đã được tạo thành công',
      description: `Yêu cầu mượn sách ${TenSach.value}  đã được tạo thành công`
    })
  } else {
    toast({
      title: 'Có lỗi xảy ra',
      description: response.data.message,
      variant: 'destructive'
    })
  }
  closeDialog()
}

defineExpose({ openDialog })
</script>
