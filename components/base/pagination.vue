<script setup lang="ts" generic="T">
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  filteredData: T[]
}>()

defineEmits<{
  (e: 'update:modelValue', modelValue: number): void
}>()

const modelValue = defineModel<number>({ default: 0 })

const router = useRouter()

watchEffect(() => {
  router.push({
    query: {
      page: modelValue.value,
    },
  })
})
</script>

<template>
  <div class="flex items-center gap-2">
    <button type="button" class="text-indigo-600 disabled:text-indigo-400" :disabled="modelValue === 1" @click="$emit('update:modelValue', 1)">
      <ChevronDoubleLeftIcon class="size-5" />
    </button>
    <button type="button" class="text-indigo-600 disabled:text-indigo-400" :disabled="modelValue === 1" @click="$emit('update:modelValue', modelValue - 1)">
      <ChevronLeftIcon class="size-5" />
    </button>

    <span class="whitespace-nowrap text-gray-700">
      Strona
      <span class="font-medium">{{ modelValue }}</span>
      z
      <span class="font-medium">{{ Math.ceil(filteredData.length / 10) }}</span>
    </span>

    <button type="button" class="text-indigo-600 disabled:text-indigo-400" :disabled="modelValue * 10 >= filteredData.length" @click="$emit('update:modelValue', modelValue + 1)">
      <ChevronRightIcon class="size-5" />
    </button>

    <button type="button" class="text-indigo-600 disabled:text-indigo-400" :disabled="modelValue * 10 >= filteredData.length" @click="$emit('update:modelValue', Math.ceil(filteredData.length / 10))">
      <ChevronDoubleRightIcon class="size-5" />
    </button>
  </div>
</template>
