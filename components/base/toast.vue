<script setup lang="ts">
import { IconCircleCheck, IconX } from '@tabler/icons-vue'

defineProps<{
  type: 'success' | 'error'
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div class="pointer-events-none fixed inset-0 flex h-screen items-end justify-end p-6">
    <div class="pointer-events-auto relative overflow-hidden rounded-lg border border-t-4 border-gray-200 bg-white shadow-lg" :class="type === 'success' ? 'border-t-green-600' : 'border-red-600'">
      <div class="w-full p-4">
        <div class="flex items-start">
          <div class="flex items-start">
            <div class="mr-3 flex h-full items-start">
              <IconCircleCheck v-if="type === 'success'" class="size-6 text-green-600" />
              <IconX v-else class="size-6 text-red-600" />
            </div>

            <p class="flex-1">
              <slot />
            </p>
          </div>

          <div class="flex items-center justify-center size-6">
            <button class="ml-4" @click="$emit('close')">
              <IconX class="text-gray-700 size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
