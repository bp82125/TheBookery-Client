<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <DialogTitle>Xóa nhân viên</DialogTitle>
      </DialogHeader>
      <div class="flex justify-center">
        <CircleAlert class="size-20 text-gray-300"></CircleAlert>
      </div>

      <DialogDescription class="mb-3">
        Bạn có chắc là muốn xóa nhân viên <b>{{ HoTenNV }}</b> không?
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
import { useEmployeeStore } from '@/stores/useEmployeeStore'
import { useToast } from '@/components/ui/toast'

const { toast } = useToast()

const employeeStore = useEmployeeStore()
const dialogOpen = ref(false)

const id = ref('')
const HoTenNV = ref('')

const openDialog = (employee) => {
  id.value = employee.MSNV
  HoTenNV.value = employee.HoTenNV
  dialogOpen.value = true
}

const closeDialog = () => {
  dialogOpen.value = false
}

const handleDelete = () => {
  employeeStore.deleteEmployee(id.value)
  toast({
    title: 'Xóa nhân viên',
    description: `Nhân viên ${HoTenNV.value} đã được xóa thành công`
  })
  closeDialog()
}

defineExpose({ openDialog })
</script>
