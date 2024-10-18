<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <p class="mb-6 text-balance text-left text-gray-700">
    {{ text }}
  </p>
</template>
