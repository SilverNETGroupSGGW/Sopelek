<script setup lang="ts">
</script>

<template>
  <NuxtLoadingIndicator color="#4f46e5" />

  <div class="flex">
    <layout-sidebar />

    <main class="h-screen w-full overflow-y-scroll">
      <slot />
    </main>
  </div>
</template>
