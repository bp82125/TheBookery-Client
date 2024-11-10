<!-- src/components/SignOutDialog.vue -->
<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <DialogTitle>Xác nhận đăng xuất</DialogTitle>
      </DialogHeader>
      <div class="flex justify-center">
        <CircleAlert class="size-20 text-gray-300" />
      </div>
      <DialogDescription class="text-center mb-3">
        Bạn có chắc là muốn đăng xuất khỏi hệ thống không?
      </DialogDescription>
      <DialogFooter>
        <div class="flex flex-row space-x-2 w-full">
          <Button class="w-full" variant="outline" @click="closeDialog">Hủy</Button>
          <Button class="w-full" @click="signOut">Đăng xuất</Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { CircleAlert } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/useAuthStore'
import { useToast } from '@/components/ui/toast/use-toast'

const dialogOpen = ref(false)
const authStore = useAuthStore()
const { toast } = useToast()

const closeDialog = () => {
  dialogOpen.value = false
}

const openDialog = () => {
  dialogOpen.value = true
}

const signOut = () => {
  authStore.logout()
  toast({
    title: 'Đăng xuất thành công',
    description: 'Đăng xuất thành công khỏi hệ thống'
  })
  closeDialog()
}

defineExpose({ openDialog })
</script>
