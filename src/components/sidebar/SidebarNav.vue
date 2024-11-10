<script setup>
import { RouterLink } from 'vue-router'
import { ScrollArea } from '@/components/ui/scroll-area'

import {
  BookUser,
  BookOpenText,
  Users,
  Newspaper,
  CircleUser,
  NotepadText,
  ChartColumn
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/useAuthStore'
import { computed, onMounted } from 'vue'

const navItems = [
  {
    name: 'Sách',
    icon: BookOpenText,
    route: '/dashboard/book',
    allowRoles: ['USER, EMPLOYEE, ADMINISTRATOR']
  },
  {
    name: 'Nhà xuất bản',
    icon: Newspaper,
    route: '/dashboard/publisher',
    allowRoles: ['EMPLOYEE, ADMINISTRATOR']
  },
  {
    name: 'Đọc giả',
    icon: BookUser,
    route: '/dashboard/reader',
    allowRoles: ['EMPLOYEE, ADMINISTRATOR']
  },
  {
    name: 'Nhân viên',
    icon: Users,
    route: '/dashboard/employee',
    allowRoles: ['ADMINISTRATOR']
  },
  {
    name: 'Tài khoản',
    icon: CircleUser,
    route: '/dashboard/account',
    allowRoles: ['ADMINISTRATOR']
  },
  {
    name: 'Theo dõi mượn sách',
    icon: NotepadText,
    route: '/dashboard/tracking',
    allowRoles: ['USER', 'EMPLOYEE, ADMINISTRATOR']
  },
  {
    name: 'Thống kê',
    icon: ChartColumn,
    route: '/dashboard/analysis',
    allowRoles: ['ADMINISTRATOR']
  }
]

defineProps({
  isOpen: Boolean
})

const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchAccountInfos()
})

const LoaiTaiKhoan = computed(() => {
  return authStore.account?.LoaiTaiKhoan || 'USER'
})

const filteredNavItems = computed(() => {
  return navItems.filter((item) =>
    item.allowRoles.some((role) => role.includes(LoaiTaiKhoan.value))
  )
})
</script>

<template>
  <ScrollArea class="flex-1">
    <nav class="space-y-2 p-2">
      <RouterLink
        v-for="item in filteredNavItems"
        :key="item.name"
        :to="item.route"
        custom
        v-slot="{ isActive, href, navigate }"
      >
        <a
          :href="href"
          @click="navigate"
          class="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors"
          :class="{
            'bg-primary text-primary-foreground': isActive,
            'hover:bg-accent hover:text-accent-foreground': !isActive,
            'justify-center': !isOpen
          }"
        >
          <component :is="item.icon" class="h-5 w-5" :class="isOpen ? 'mx-2' : ''" />
          <span v-if="isOpen">{{ item.name }}</span>
        </a>
      </RouterLink>
    </nav>
  </ScrollArea>
</template>
