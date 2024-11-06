<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <DialogTitle>{{ KichHoat ? 'Vô hiệu hóa tài khoản' : 'Kích hoạt tài khoản' }}</DialogTitle>
      </DialogHeader>
      <div class="flex justify-center my-8">
        <CircleAlert class="size-20 text-gray-300"></CircleAlert>
      </div>

      <DialogDescription class="mb-3">
        Bạn có chắc là muốn
        <b>{{ KichHoat ? 'Vô hiệu hóa ' : 'Kích hoạt ' }}</b> tài khoản
        <b>{{ TenDangNhap }}</b> không?
      </DialogDescription>
      <DialogFooter class="w-full">
        <Button variant="outline" @click="closeDialog" class="w-full">Hủy</Button>
        <Button @click="handleToggle" class="w-full">{{
          KichHoat ? 'Vô hiệu hóa' : 'Kích hoạt'
        }}</Button>
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
const KichHoat = ref(null)
const TenDangNhap = ref('')

const openDialog = (account) => {
  id.value = account.MaTaiKhoan
  TenDangNhap.value = account.TenDangNhap
  KichHoat.value = account.KichHoat
  dialogOpen.value = true
}

const closeDialog = () => {
  dialogOpen.value = false
}

const handleToggle = () => {
  accountStore.toggleAccount(id.value)
  toast({
    title: KichHoat.value ? 'Vô hiệu hóa tài khoản' : 'Kích hoạt tài khoản',
    description: `Tài khoản ${TenDangNhap.value} được ${KichHoat.value ? 'vô hiệu hóa' : 'kích hoạt'} thành công`
  })
  closeDialog()
}

defineExpose({ openDialog })
</script>
