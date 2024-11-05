<template>
  <Popover v-model:open="isOpen" class="relative">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="isOpen"
        class="w-full justify-between"
      >
        <span class="font-normal">{{ selected ? selected : 'Chọn chức vụ...' }}</span>
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0">
      <Command>
        <CommandInput placeholder="Tìm kiếm..." v-model="search" />
        <CommandEmpty v-if="filteredOptions.length === 0" class="ml-5 py-0">
          <Button variant="ghost" class="w-full justify-start" @click="createNewOption">
            <span class="font-normal mr-1">Thêm</span>
            <span>{{ search }}</span>
          </Button>
        </CommandEmpty>
        <CommandGroup>
          <CommandItem
            v-for="option in filteredOptions"
            :key="option"
            :value="option"
            @select="selectOption(option)"
          >
            <Check :class="['mr-2 h-4 w-4', selected === option ? 'opacity-100' : 'opacity-0']" />
            {{ option }}
          </CommandItem>
        </CommandGroup>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useEmployeeStore } from '@/stores/useEmployeeStore'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import { Check, ChevronsUpDown } from 'lucide-vue-next'

const employeeStore = useEmployeeStore()
const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const selected = ref(props.modelValue || null)
const search = ref('')
const isOpen = ref(false)

watch(
  () => props.modelValue,
  (newValue) => {
    selected.value = newValue || null
  }
)

const filteredOptions = computed(() => {
  return employeeStore.positions.filter((option) => option.includes(search.value))
})

const createNewOption = () => {
  const newOption = search.value
  if (newOption && !employeeStore.positions.includes(newOption)) {
    employeeStore.positions.push(newOption)
    selectOption(newOption)
    search.value = ''
  }
}

const selectOption = (option) => {
  selected.value = option
  emit('update:modelValue', option)
  isOpen.value = false
}
</script>
