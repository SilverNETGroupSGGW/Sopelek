<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <h1 class="text-2xl font-bold leading-9 text-gray-900">
    {{ text }}
  </h1>
</template>
