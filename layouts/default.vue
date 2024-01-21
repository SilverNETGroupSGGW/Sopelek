<script setup lang="ts">
import { useOfetchError } from '~/plugins/ofetch'

// Ofetch
const ofetchError = useOfetchError()

// Route
const route = useRoute()

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

  <base-toast :show="ofetchError !== null" :type="ofetchError === 200 ? 'success' : 'error'" :durable="ofetchError === 200" @close="ofetchError = null">
    <template v-if="ofetchError === 401">
      Sesja wygasła.
      <NuxtLink to="/signin" class="underline" @click="ofetchError = null">
        Zaloguj się ponownie
      </NuxtLink>
    </template>

    <!-- 200, when subjects saved -->
    <template v-else-if="ofetchError === 200">
      <span class="text-sm font-medium text-gray-700">Zapisano zmiany.</span>
    </template>

    <template v-else-if="ofetchError === 400">
      <span class="text-sm font-medium text-gray-700">Nieprawidłowe dane, nie zapisano zmian. Sprawdź plan w poszukiwaniu konfliktów.</span>
      <ul class="list-inside list-disc">
        <li class="text-sm text-gray-600">
          Jeżeli zajęcia nakładają się na inne, przenieś je poza obszar konfliktu lub usuń je za pomocą przycisku Usuń.
        </li>
        <li class="text-sm text-gray-600">
          Sprawdź też
          <NuxtLink :to="`/schedules/${route.params.scheduleId}/subjects/list`" class="font-medium underline">
            listę zajęć
          </NuxtLink> i upewnij się, że wszystkie są poprawnie uzupełnione.
        </li>
      </ul>
    </template>
  </base-toast>
</template>
