<script setup lang="ts">
defineProps<{
  active?: boolean
  icon: any
  to: string
}>()
</script>

<template>
  <NuxtLink :to="to" class="-mx-3 flex size-12 items-center justify-center gap-3 rounded-full font-medium text-indigo-100 transition-colors duration-200 ease-in-out hover:bg-indigo-500" :class="[active ? 'bg-indigo-400' : 'bg-indigo-600']">
    <component :is="icon" class="size-5 stroke-2" />
  </NuxtLink>
</template>
