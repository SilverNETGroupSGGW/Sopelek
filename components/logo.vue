<script setup lang="ts">
defineProps<{
  colorClass: string
}>()
</script>

<template>
  <NuxtLink to="/" class="block space-y-0.5">
    <div class="h-1.5 w-6 rounded-3xl" :class="colorClass" />
    <div class="ml-2">
      <div class="h-1.5 w-6 rounded-3xl" :class="colorClass" />
    </div>
    <div class="ml-1.5">
      <div class="h-1.5 w-6 rounded-3xl" :class="colorClass" />
    </div>
    <div class="h-1.5 w-6 rounded-3xl" :class="colorClass" />
  </NuxtLink>
</template>
