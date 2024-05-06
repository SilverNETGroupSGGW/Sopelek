<script setup lang="ts">
defineProps<{
  label?: string
  description?: string
  disabled?: boolean
}>()

const model = defineModel<boolean>()

// SSR unsafe
const id = Math.random().toString(36).substr(2, 9)
</script>

<template>
  <div class="flex gap-x-2" :class="{ 'items-start': description, 'items-center': !description }">
    <input :id="id" v-model="model" type="checkbox" class="accent-indigo-600" :class="{ 'mt-1.5': description }" :disabled="disabled">
    <label :for="id">
      <span class="font-medium text-gray-700">{{ label }}</span>
      <template v-if="description">
        <br>
        <span class="text-sm text-gray-600">{{ description }}</span>
      </template>
    </label>
  </div>
</template>
