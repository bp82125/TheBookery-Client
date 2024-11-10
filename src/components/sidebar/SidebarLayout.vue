<template>
  <aside
    class="flex flex-col h-screen bg-background border-r transition-all duration-300 ease-in-out shadow-lg"
    :class="{ 'w-64': isOpen, 'w-20': !isOpen }"
  >
    <SidebarHeader :is-open="isOpen" @toggle="toggleSidebar"></SidebarHeader>
    <SidebarNav :is-open="isOpen"></SidebarNav>
    <SidebarFooter
      :is-open="isOpen"
      @changePassword="openChangePasswordDialog"
      @signOut="openSignOutDialog"
    ></SidebarFooter>

    <SignoutDialog ref="signOutDialog"></SignoutDialog>
    <AccountChangePasswordDialog ref="changePasswordDialog"></AccountChangePasswordDialog>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import SidebarHeader from './SidebarHeader.vue'
import SidebarNav from './SidebarNav.vue'
import SidebarFooter from './SidebarFooter.vue'

import SignoutDialog from './SignoutDialog.vue'
import AccountChangePasswordDialog from './AccountChangePasswordDialog.vue'

const isOpen = ref(true)
const signOutDialog = ref(null)
const changePasswordDialog = ref(null)

const openSignOutDialog = () => {
  console.log('Hi')
  signOutDialog.value.openDialog()
}

const openChangePasswordDialog = () => {
  changePasswordDialog.value.openDialog()
}

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}
</script>
