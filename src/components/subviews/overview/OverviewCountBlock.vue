<template>
  <div class="rounded-lg border bg-card text-card-foreground shadow-lg p-4 flex flex-col">
    <div class="flex justify-between items-center mb-2">
      <h3 class="text-sm font-medium text-muted-foreground">{{ name }}</h3>
      <div class="relative">
        <component :is="icon" class="relative h-5 w-5" />
      </div>
    </div>
    <p class="text-3xl font-bold mb-1">{{ count }}</p>
    <p class="text-sm text-muted-foreground">{{ description }}</p>
  </div>
</template>

<script setup>
import { Book, User, UserCircle, BookOpen } from 'lucide-vue-next'

const props = defineProps({
  name: String,
  count: Number,
  type: {
    type: String,
    required: true,
    validator: (value) => ['sach', 'docGia', 'nhanVien', 'theoDoiMuonSach'].includes(value)
  },
  description: String
})

const iconMap = {
  sach: Book,
  docGia: User,
  nhanVien: UserCircle,
  theoDoiMuonSach: BookOpen
}

const icon = iconMap[props.type]
</script>
