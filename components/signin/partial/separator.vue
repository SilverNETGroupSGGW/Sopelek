<script setup lang="ts">
defineProps<{
  character: string
}>()
</script>

<template>
  <div class="mx-1">
    {{ character }}
  </div>
</template>
