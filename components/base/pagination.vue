<script setup lang="ts" generic="T">
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  modelValue: number
  filteredData: T[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: number): void
}>()

// Fix - when deleting items from the last page and when it gets empty, it doesn't go back to the previous page
watch(() => props.filteredData.length, () => {
  if (props.modelValue * 10 >= props.filteredData.length && props.modelValue !== 1)
    emit('update:modelValue', props.modelValue - 1)
})
</script>

<template>
  <div class="flex items-center gap-2">
    <button class="text-indigo-600 disabled:text-indigo-400" :disabled="modelValue === 1" @click="$emit('update:modelValue', 1)">
      <ChevronDoubleLeftIcon class="h-5 w-5" />
    </button>
    <button class="text-indigo-600 disabled:text-indigo-400" :disabled="modelValue === 1" @click="$emit('update:modelValue', modelValue - 1)">
      <ChevronLeftIcon class="h-5 w-5" />
    </button>

    <span class="text-gray-700 whitespace-nowrap">
      Strona
      <span class="font-medium">{{ modelValue }}</span>
      z
      <span class="font-medium">{{ Math.ceil(filteredData.length / 10) }}</span>
    </span>

    <button class="text-indigo-600 disabled:text-indigo-400" :disabled="modelValue * 10 >= filteredData.length" @click="$emit('update:modelValue', modelValue + 1)">
      <ChevronRightIcon class="h-5 w-5" />
    </button>

    <button class="text-indigo-600 disabled:text-indigo-400" :disabled="modelValue * 10 >= filteredData.length" @click="$emit('update:modelValue', Math.ceil(filteredData.length / 10))">
      <ChevronDoubleRightIcon class="h-5 w-5" />
    </button>
  </div>
</template>
