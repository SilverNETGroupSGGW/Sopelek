<script setup lang="ts">
import { useOfetchError } from '~/plugins/ofetch'

const ofetchError = useOfetchError()

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

  <base-toast :show="ofetchError !== null" type="error" @close="ofetchError = null">
    <template v-if="ofetchError === 401">
      Sesja wygasła.
      <NuxtLink to="/signin" class="underline" @click="ofetchError = null">
        Zaloguj się ponownie
      </NuxtLink>
    </template>

    <template v-else-if="ofetchError === 400">
      Nieprawidłowe dane. Może to być na przykład konflikt w zajęciach.
    </template>
  </base-toast>
</template>
