<script setup lang="ts">
import { NuxtLink } from '#components'

const props = defineProps<{
  flat?: boolean
  loading?: boolean
  to?: string
  variant: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'flat'
}>()

// Preserve width and height when loading
const button = ref<HTMLButtonElement | null>(null)
const width = ref<string | null>(null)
const height = ref<string | null>(null)

watchEffect(() => {
  if (button.value) {
    if (props.loading) {
      width.value = `${button.value.offsetWidth!}px`
      height.value = `${button.value.offsetHeight!}px`
    }
    else {
      width.value = null
      height.value = null
    }
  }
})
</script>

<template>
  <component
    :is="to ? NuxtLink : 'button'"
    ref="button"
    :to="to"
    v-bind="$attrs"
    :style="{ width, height }"
    class="flex cursor-pointer items-center justify-center gap-2 px-4 py-2 font-medium transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 active:ring-2"
    :class="{
      'disabled:opacity-50': $attrs.disabled,
      'rounded-lg bg-indigo-600 text-indigo-50 hover:bg-indigo-700 focus:ring-indigo-700/50 active:ring-indigo-700/50': variant === 'primary',
      'rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 focus:ring-gray-100/50 active:ring-gray-100/50': variant === 'secondary',
      'rounded-lg bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-100/50 active:ring-red-100/50': variant === 'danger',
      'rounded-lg bg-green-50 text-green-600 hover:bg-green-100 focus:ring-green-100/50 active:ring-green-100/50': variant === 'success',
      'rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100 focus:ring-yellow-100/50 active:ring-yellow-100/50': variant === 'warning',
      'bg-transparent': flat,
    }"
  >
    <slot v-if="!loading" />
    <base-spinner
      v-else
      :class="{
        'fill-indigo-50': variant === 'primary',
        'fill-gray-600': variant === 'secondary',
        'fill-red-600': variant === 'danger',
        'fill-green-600': variant === 'success',
        'fill-yellow-600': variant === 'warning',
      }"
    />
  </component>
</template>
