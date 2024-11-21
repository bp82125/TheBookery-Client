<!-- OriginalComponent.vue -->
<script setup>
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/stores/useAuthStore'
import { Settings, KeyRound, LogOut, User } from 'lucide-vue-next'
import { computed } from 'vue'

defineProps({
  isOpen: Boolean
})

const authStore = useAuthStore()

const isAdmin = computed(() => {
  return authStore.account.LoaiTaiKhoan === 'ADMINISTRATOR'
})

const emit = defineEmits(['changePassword', 'signOut', 'updateInfo'])

const handleResetPassword = () => {
  emit('changePassword')
}

const handleSignOut = () => {
  emit('signOut')
}

const handleUpdateInfo = () => {
  emit('updateInfo')
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
        <template v-if="!isAdmin">
          <DropdownMenuItem @select="handleUpdateInfo">
            <User class="mr-2 h-4 w-4" />
            <span>Chỉnh sửa thông tin</span>
          </DropdownMenuItem>
        </template>

        <DropdownMenuItem @select="handleResetPassword">
          <KeyRound class="mr-2 h-4 w-4" />
          <span>Đổi mật khẩu</span>
        </DropdownMenuItem>
        <DropdownMenuItem @select="handleSignOut">
          <LogOut class="mr-2 h-4 w-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
