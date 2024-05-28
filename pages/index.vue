<script setup lang="ts">
definePageMeta({
  layout: 'empty',
})
</script>

<template>
  <NuxtLink to="/signin" class="group w-full">
    <div class="h-full cursor-pointer rounded-lg border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg group-hover:bg-indigo-600">
      <h2 class="mb-2 block text-2xl font-bold text-gray-700 transition-colors duration-200 group-hover:text-white">
        Zaloguj się
      </h2>
    </div>
  </NuxtLink>
</template>
