<script setup lang="ts">
const toasts = useToasts()
</script>

<template>
  <NuxtLoadingIndicator color="#4f46e5" />

  <div class="flex">
    <layout-sidebar />

    <main class="h-screen w-full overflow-y-scroll">
      <slot />
    </main>
  </div>

  <base-toast v-for="(toast, index) in toasts.toasts" :key="index" :type="toast.type" @close="toasts.removeToast(index)">
    <span class="text-sm font-medium text-gray-700">{{ toast.message }}</span>
  </base-toast>
</template>
