<script setup lang="ts">
defineProps<{
  headerText: string
  messsageText: string
  link?: string
}>()
</script>

<template>
  <NuxtLink v-if="link" :to="link" class="group w-full">
    <div class="h-full cursor-pointer rounded-lg border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg group-hover:bg-indigo-600">
      <h2 class="mb-2 block text-2xl font-bold text-gray-700 transition-colors duration-200 group-hover:text-white">
        {{ headerText }}
      </h2>
      <p class="text-gray-600 group-hover:text-white">
        {{ messsageText }}
      </p>
    </div>
  </NuxtLink>

  <div v-if="!link" class="w-full rounded-lg border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg">
    <p class="mb-2 block text-2xl font-bold text-gray-700 transition-colors duration-200 hover:text-gray-900">
      {{ headerText }}
    </p>
    <p class="text-gray-600">
      {{ messsageText }}
    </p>
  </div>
</template>
