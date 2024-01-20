<script setup lang="ts">
import { CheckCircleIcon, XMarkIcon } from '@heroicons/vue/20/solid'

defineProps<{
  show: boolean
  type: 'success' | 'error'
}>()

const emits = defineEmits<{
  (e: 'close'): void
}>()

function handleClose() {
  emits('close')
}
</script>

<template>
  <div v-if="show" class="pointer-events-none fixed inset-0 flex h-screen items-end justify-end p-6">
    <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-out" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
      <div v-if="show" class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
        <div class="p-4">
          <div class="flex items-center">
            <div class="mr-3 shrink-0">
              <CheckCircleIcon v-if="type === 'success'" class="size-6 text-green-600" />
              <XMarkIcon v-if="type === 'error'" class="size-6 text-red-600" />
            </div>

            <p class="flex-1 text-sm font-medium text-gray-700">
              <slot />
            </p>

            <div class="ml-4 flex shrink-0">
              <button class="inline-flex text-gray-400 transition duration-150 ease-in-out focus:text-gray-500 focus:outline-none" @click="handleClose">
                <XMarkIcon class="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
