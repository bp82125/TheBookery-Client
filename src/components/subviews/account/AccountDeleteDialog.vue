<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <DialogTitle>Xóa tài khoản</DialogTitle>
      </DialogHeader>
      <div class="flex justify-center">
        <CircleAlert class="size-20 text-gray-300"></CircleAlert>
      </div>

      <DialogDescription class="mb-3">
        Bạn có chắc là muốn xóa tài khoản <b>{{ TenDangNhap }}</b> không? Điều này cũng sẽ tiến hành
        xóa luôn người dùng <b>{{ HoTen }}</b
        >.
      </DialogDescription>
      <DialogDescription class="mb-3"> Hành động này không thể hoàn tác! </DialogDescription>
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
import { useAccountStore } from '@/stores/useAccountStore'
import { useToast } from '@/components/ui/toast'

const { toast } = useToast()

const accountStore = useAccountStore()
const dialogOpen = ref(false)

const id = ref('')
const HoTen = ref('')
const TenDangNhap = ref('')

const getFullName = (account) => {
  if (account.DocGia) {
    return `${account.DocGia.HoLot} ${account.DocGia.Ten}`
  } else if (account.NhanVien) {
    return account.NhanVien.HoTenNV
  }
  return 'N/A'
}

const openDialog = (account) => {
  id.value = account.MaTaiKhoan
  TenDangNhap.value = account.TenDangNhap
  HoTen.value = getFullName(account)
  dialogOpen.value = true
}

const closeDialog = () => {
  dialogOpen.value = false
}

const handleDelete = () => {
  accountStore.deleteAccount(id.value)
  toast({
    title: 'Xóa tài khoản',
    description: `Tài khoản ${TenDangNhap.value} đã xóa thành công`
  })
  closeDialog()
}

defineExpose({ openDialog })
</script>
