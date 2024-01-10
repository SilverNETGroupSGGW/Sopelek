<script setup lang="ts">
const { start } = useLoadingIndicator()
start()
</script>

<template>
  <NuxtLoadingIndicator color="#4F46E5" />
  <div class="flex">
    <layout-sidebar />

    <main class="h-screen w-full overflow-y-scroll">
      <slot />
    </main>
  </div>
</template>
