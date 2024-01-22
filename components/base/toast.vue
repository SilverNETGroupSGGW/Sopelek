<script setup lang="ts">
import { CheckCircleIcon, XMarkIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  show: boolean
  type: 'success' | 'error'
}>()

const emits = defineEmits<{
  (e: 'close'): void
}>()

const isDurating = ref(false)

let timeoutId: NodeJS.Timeout | null = null
let rafId: number | null = null

watchEffect(() => {
  if (props.show) {
    isDurating.value = true
    clearTimeout(timeoutId!)
    timeoutId = setTimeout(() => {
      emits('close')
      isDurating.value = false
    }, props.type === 'success' ? 1500 : 5000)
  }
})

const progress = ref(0)

watchEffect(() => {
  if (isDurating.value) {
    let start: number | null = null
    const duration = props.type === 'success' ? 1500 : 5000

    const animate = (timestamp: number) => {
      if (!start)
        start = timestamp
      const elapsed = timestamp - start
      progress.value = Math.min((elapsed / duration) * 100, 100)
      if (elapsed < duration)
        rafId = requestAnimationFrame(animate)
    }

    cancelAnimationFrame(rafId!)
    rafId = requestAnimationFrame(animate)
  }
})

watch(() => props.type, () => {
  progress.value = 0
  clearTimeout(timeoutId!)
  cancelAnimationFrame(rafId!)
})
</script>

<template>
  <transition enter-active-class="transition duration-200 ease-out" enter-from-class="transform translate-y-2 opacity-0" enter-to-class="transform translate-y-0 opacity-100" leave-active-class="transition duration-200 ease-out" leave-from-class="transform translate-y-0 opacity-100" leave-to-class="transform translate-y-2 opacity-0">
    <div v-if="show" class="pointer-events-none fixed inset-0 flex h-screen items-end justify-end p-6">
      <div v-if="show" class="pointer-events-auto relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
        <div class="w-full p-4">
          <div class="flex items-start">
            <div class="mr-3 flex h-full items-start">
              <CheckCircleIcon v-if="type === 'success'" class="size-6 text-green-600" />
              <XMarkIcon v-if="type === 'error'" class="size-6 text-red-600" />
            </div>

            <p class="flex-1">
              <slot />
            </p>
          </div>
        </div>

        <div class="absolute inset-x-0 top-0 h-1" :style="{ width: `${progress}%` }" :class="{ 'bg-green-500': type === 'success', 'bg-red-500': type === 'error' }" />
      </div>
    </div>
  </transition>
</template>
