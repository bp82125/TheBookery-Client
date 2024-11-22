<template>
  <Card class="w-full max-w-sm overflow-hidden shadow-lg flex flex-col h-full">
    <div class="aspect-square overflow-hidden relative">
      <img
        :src="book.HinhAnh || `https://picsum.photos/800`"
        :alt="book.TenSach"
        loading="lazy"
        class="object-cover w-full h-full"
      />
    </div>
    <CardHeader>
      <CardTitle class="line-clamp-2 text-xl">{{ book.TenSach }}</CardTitle>
      <CardDescription>Phát hành năm {{ book.NamXuatBan }}</CardDescription>
    </CardHeader>
    <div class="flex-grow">
      <CardContent>
        <div class="space-y-2">
          <p>
            <strong>Đơn giá: </strong> {{ book.DonGia.toLocaleString('en').replace(/,/g, '.') }}đ
          </p>
          <p><strong>Số lượng:</strong> {{ book.SoQuyen }}</p>
          <p><strong>Nguồn gốc:</strong> {{ book.NguonGoc }}</p>
          <p>
            <strong>Nhà xuất bản:</strong> {{ book.NhaXuatBan ? book.NhaXuatBan.TenNXB : 'N/A' }}
          </p>
        </div>
      </CardContent>
    </div>
    <CardFooter>
      <template v-if="LoaiTaiKhoan === 'USER'">
        <div class="w-full">
          <Button
            class="w-full bg-blue-600 hover:bg-blue-700"
            :class="
              book.SoQuyen !== 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'
            "
            :disabled="book.SoQuyen === 0"
            @click="handleBookBorrowing(book)"
          >
            <Plus v-if="book.SoQuyen !== 0" class="mr-2 h-4 w-4" />
            {{ book.SoQuyen === 0 ? 'Đã hết sách' : 'Yêu cầu mượn sách' }}
          </Button>
        </div>
      </template>
      <template v-else>
        <div class="flex justify-between gap-x-2">
          <Button variant="outline" class="w-full" @click="handleEdit(book)">
            <PencilIcon class="mr-2 h-4 w-4" />
            Chỉnh sửa
          </Button>
          <Button variant="destructive" class="w-full" @click="handleDelete(book)">
            <TrashIcon class="mr-2 h-4 w-4" />
            Xóa
          </Button>
        </div>
      </template>
    </CardFooter>
  </Card>
</template>

<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PencilIcon, TrashIcon, Plus } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/useAuthStore'
import { computed } from 'vue'

const authStore = useAuthStore()

const LoaiTaiKhoan = computed(() => {
  return authStore.account?.LoaiTaiKhoan || 'USER'
})

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete', 'borrow'])

const handleEdit = (book) => {
  emit('edit', book)
}

const handleDelete = (book) => {
  emit('delete', book)
}

const handleBookBorrowing = (book) => {
  emit('borrow', book)
}
</script>
