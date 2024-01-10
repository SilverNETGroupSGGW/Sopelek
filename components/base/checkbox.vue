<script setup lang="ts">
defineProps<{
  label: string
}>()

const model = defineModel<boolean>()
</script>

<template>
  <div class="flex items-center gap-2">
    <input id="checkbox" v-model="model" type="checkbox" class="accent-indigo-600">
    <label class="mb-1 font-medium text-gray-700" for="checkbox">{{ label }}</label>
  </div>
</template>
