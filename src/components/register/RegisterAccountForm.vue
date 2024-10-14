<template>
  <div class="space-y-4">
    <div class="space-y-2">
      <Label for="username">Username</Label>
      <Input id="username" v-model="accountInfo.username" placeholder="johndoe" />
    </div>
    <div class="space-y-2">
      <Label for="password">Password</Label>
      <Input id="password" v-model="accountInfo.password" type="password" />
    </div>
    <div class="space-y-2">
      <Label for="confirmPassword">Confirm Password</Label>
      <Input id="confirmPassword" v-model="accountInfo.confirmPassword" type="password" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const props = defineProps(['accountInfo'])
const emit = defineEmits(['update:accountInfo'])

const accountInfo = computed({
  get: () => props.accountInfo,
  set: (value) => emit('update:accountInfo', value)
})
</script>
