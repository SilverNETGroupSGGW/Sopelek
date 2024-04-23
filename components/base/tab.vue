<script setup lang="ts">
import { NuxtLink } from '#components'

defineProps<{
  active?: boolean
  icon: any
  to: string
  onClick?: () => Promise<void>
}>()
</script>

<template>
  <component :is="onClick ? 'button' : NuxtLink" :to="onClick ? undefined : to" class="-mx-3 cursor-pointer flex size-12 items-center justify-center gap-3 rounded-full font-medium text-indigo-100 transition-colors duration-200 ease-in-out hover:bg-indigo-500" :class="[active ? 'bg-indigo-400' : 'bg-indigo-600']" @click="onClick">
    <component :is="icon" class="size-5 stroke-2" />
  </component>
</template>
