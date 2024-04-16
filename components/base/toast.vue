<script setup lang="ts">
import { IconCircleCheck, IconX } from '@tabler/icons-vue'

const props = defineProps<{
  show: boolean
  type: 'success' | 'error'
}>()

const emits = defineEmits<{
  (e: 'close'): void
}>()

const start = ref<number | null>(null)
const progress = ref(0)

function animate(timestamp: number) {
  if (!start.value)
    start.value = timestamp
  const elapsed = timestamp - start.value
  const duration = props.type === 'success' ? 2000 : 6000 // duration in ms

  progress.value = (elapsed / duration) * 100

  if (progress.value >= 100) {
    progress.value = 100
    emits('close')
  }
  else {
    requestAnimationFrame(animate)
  }
}

watchEffect(() => {
  if (props.show) {
    progress.value = 0
    start.value = null
    requestAnimationFrame(animate)
  }
})

watchEffect(() => {
  if (props.type && props.show) {
    progress.value = 0
    start.value = null
    requestAnimationFrame(animate)
  }
})
</script>

<template>
  <transition enter-active-class="transition duration-200 ease-out" enter-from-class="transform translate-y-2 opacity-0" enter-to-class="transform translate-y-0 opacity-100" leave-active-class="transition duration-200 ease-out" leave-from-class="transform translate-y-0 opacity-100" leave-to-class="transform translate-y-2 opacity-0">
    <div v-if="show" class="pointer-events-none fixed inset-0 flex h-screen items-end justify-end p-6">
      <div v-if="show" class="pointer-events-auto relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
        <div class="w-full p-4">
          <div class="flex items-start">
            <div class="mr-3 flex h-full items-start">
              <IconCircleCheck v-if="type === 'success'" class="size-6 text-green-600" />
              <IconX v-if="type === 'error'" class="size-6 text-red-600" />
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
