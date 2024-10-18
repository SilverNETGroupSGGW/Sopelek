<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <h1 class="mb-2 text-left text-3xl font-bold text-gray-900">
    {{ text }}
  </h1>
</template>
