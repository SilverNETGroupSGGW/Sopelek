<script setup lang="ts">
import { NuxtLink } from '#components'

withDefaults(defineProps<{
  variant: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'flat'
  flat?: boolean
  to?: string
  dense?: boolean
}>(), {
  dense: false,
})
</script>

<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    v-bind="$attrs"
    class="flex cursor-pointer items-center justify-center gap-2 font-medium transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 active:ring-2"
    :class="{
      'disabled:opacity-50': $attrs.disabled,
      'rounded-lg bg-indigo-600 text-indigo-50 hover:bg-indigo-700 focus:ring-indigo-700/50 active:ring-indigo-700/50': variant === 'primary',
      'rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 focus:ring-gray-100/50 active:ring-gray-100/50': variant === 'secondary',
      'rounded-lg bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-100/50 active:ring-red-100/50': variant === 'danger',
      'rounded-lg bg-green-50 text-green-600 hover:bg-green-100 focus:ring-green-100/50 active:ring-green-100/50': variant === 'success',
      'rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100 focus:ring-yellow-100/50 active:ring-yellow-100/50': variant === 'warning',
      'bg-transparent': flat,
      'px-4 py-2': !dense,
      'px-2.5 py-1.5 text-sm': dense,
    }"
  >
    <slot />
  </component>
</template>
