<script setup lang="ts">
defineProps<{
  onClick: () => void
  text: string
}>()
</script>

<template>
  <button @click="onClick">
    <a class="text-sm text-blue-500 hover:underline">
      {{ text }}
    </a>
  </button>
</template>
