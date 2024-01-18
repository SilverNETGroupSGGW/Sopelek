<script setup lang="ts">
defineProps<{
  icon: any
  label: string
  to: string
  collapsed?: boolean
  active?: boolean
}>()
</script>

<template>
  <NuxtLink :to="to" class="-mx-3 flex size-12 items-center justify-center gap-3 rounded-full font-medium transition-colors duration-200 ease-in-out group-hover:bg-indigo-500" :class="[active ? 'bg-indigo-400 text-indigo-100' : 'text-indigo-100']">
    <component :is="icon" class="size-5 stroke-2" />
  </NuxtLink>
</template>
