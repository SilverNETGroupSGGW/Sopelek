<script setup lang="ts">
defineProps<{
  color: 'indigo' | 'white' | 'gray'
  linkUrl?: string
}>()

function colorClass(color: 'indigo' | 'white' | 'gray') {
  return {
    'bg-indigo-50': color === 'indigo',
    'bg-white': color === 'white',
    'bg-gray-400': color === 'gray',
  }
}
</script>

<template>
  <NuxtLink :to="linkUrl ? linkUrl : '/'" class="block space-y-0.5">
    <div class="h-1.5 w-6 rounded-3xl" :class="colorClass(color)" />
    <div class="ml-2">
      <div class="h-1.5 w-6 rounded-3xl" :class="colorClass(color)" />
    </div>
    <div class="ml-1.5">
      <div class="h-1.5 w-6 rounded-3xl" :class="colorClass(color)" />
    </div>
    <div class="h-1.5 w-6 rounded-3xl" :class="colorClass(color)" />
  </NuxtLink>
</template>
