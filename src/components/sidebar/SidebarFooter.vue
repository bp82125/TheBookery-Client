<script setup>
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/stores/useAuthStore'
import { Settings, KeyRound, LogOut } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

const authStore = useAuthStore()

defineProps({
  isOpen: Boolean
})

const resetPassword = () => {
  console.log('Reset Password clicked')
}

const signOut = () => {
  authStore.logout()
  toast({
    title: 'Đăng xuất thành công',
    description: 'Đăng xuất thành công khỏi hệ thống'
  })
}
</script>

<template>
  <div class="p-4">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" class="w-full flex items-center" :class="isOpen ? 'p-4' : 'p-2'">
          <Settings class="h-4 w-4" />
          <span v-if="isOpen" class="ml-3">Cài đặt</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuItem @select="resetPassword">
          <KeyRound class="mr-2 h-4 w-4" />
          <span>Đặt lại mật khẩu</span>
        </DropdownMenuItem>
        <DropdownMenuItem @select="signOut">
          <LogOut class="mr-2 h-4 w-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
