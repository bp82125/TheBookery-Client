<!-- OriginalComponent.vue -->
<script setup>
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Settings, KeyRound, LogOut } from 'lucide-vue-next'

defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['changePassword', 'signOut'])

const handleResetPassword = () => {
  emit('changePassword')
}

const handleSignOut = () => {
  emit('signOut')
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
        <DropdownMenuItem @select="handleResetPassword">
          <KeyRound class="mr-2 h-4 w-4" />
          <span>Đặt lại mật khẩu</span>
        </DropdownMenuItem>
        <DropdownMenuItem @select="handleSignOut">
          <LogOut class="mr-2 h-4 w-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
