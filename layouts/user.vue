<template>
  <NuxtLoadingIndicator color="#4f46e5" />

  <div class="flex h-screen w-screen">
    <div class="h-full w-1/3">
      <slot />
    </div>
    <div class="w-2/3 bg-indigo-600" />
  </div>
</template>
