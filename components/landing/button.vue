<script setup lang="ts">
import { IconArrowRight } from '@tabler/icons-vue'

defineProps<{
  text: string
  to: string
  arrow?: boolean
  theme: 'dark' | 'light'
}>()
</script>

<template>
  <a
    class="shrink-0 items-center gap-x-2 rounded-full text-sm font-medium focus:outline-none focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-inset disabled:cursor-not-allowed disabled:bg-gray-900 disabled:opacity-75 lg:flex"
    :class="{
      'hidden bg-gray-900 px-3 py-2 text-white shadow-sm hover:bg-gray-800 disabled:bg-gray-900 lg:flex': theme === 'dark',
      'inline-flex bg-neutral-50 p-2 text-gray-700 ring-1 ring-gray-300 hover:bg-gray-100 hover:text-gray-900': theme === 'light',
    }"
    :href="to"
    aria-hidden="true"
  >
    <span class="">{{ text }}</span>
    <IconArrowRight v-if="arrow" class="size-5" />
  </a>
</template>
