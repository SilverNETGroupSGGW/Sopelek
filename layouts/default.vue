<script setup lang="ts">
import { useOfetchStatus } from '~/plugins/ofetch'

// Ofetch
const ofetchStatus = useOfetchStatus()

const { start } = useLoadingIndicator()
start()

function resetOfetchStatus() {
  ofetchStatus.value.request = ''
  ofetchStatus.value.status = 0
  ofetchStatus.value.method = ''
}

const isOfetchEmpty = computed(() => {
  return ofetchStatus.value.request === '' && ofetchStatus.value.status === 0 && ofetchStatus.value.method === ''
})
</script>

<template>
  <NuxtLoadingIndicator color="#4F46E5" />
  <div class="flex">
    <layout-sidebar />

    <main class="h-screen w-full overflow-y-scroll">
      <slot />
    </main>
  </div>

  <base-toast :type="ofetchStatus.status === 200 ? 'success' : 'error'" :show="!isOfetchEmpty" @close="resetOfetchStatus">
    <template v-if="ofetchStatus.status === 200">
      <template v-if="ofetchStatus.request.endsWith('login')">
        <span class="text-sm font-medium text-gray-700">Witamy w aplikacji!</span>
      </template>

      <template v-if="ofetchStatus.request.includes('generate')">
        <span class="text-sm font-medium text-gray-700">Trwa pobieranie pliku.</span>
      </template>

      <template v-else>
        <span class="text-sm font-medium text-gray-700">Zapisano zmiany.</span>
      </template>
    </template>

    <template v-else>
      <template v-if="ofetchStatus.request.endsWith('login')">
        <span class="text-sm font-medium text-gray-700">Niepoprawne dane logowania.</span>
      </template>

      <template v-else-if="ofetchStatus.status === 401">
        <span class="text-sm font-medium text-gray-700">
          Sesja wygasła. <NuxtLink to="/signin" class="underline">Zaloguj się ponownie</NuxtLink>.
        </span>
      </template>

      <template v-else-if="ofetchStatus.status === 400 && ofetchStatus.request.endsWith('subjects')">
        <span class="text-sm font-medium text-gray-700">Nieprawidłowe dane, nie zapisano zmian. Sprawdź plan w poszukiwaniu konfliktów.</span>
        <ul class="list-inside list-disc">
          <li class="text-sm text-gray-600">
            Jeżeli zajęcia nakładają się na inne, przenieś je poza obszar konfliktu lub usuń je za pomocą przycisku Usuń.
          </li>
          <li class="text-sm text-gray-600">
            Sprawdź też listę zajęć i upewnij się, że wszystkie są poprawnie uzupełnione.
          </li>
          <li class="text-sm text-gray-600">
            Jeżeli edytujesz lub tworzysz nowe zajęcia, upewnij się, że wszystkie pola są poprawnie uzupełnione.
          </li>
        </ul>
      </template>

      <template v-else-if="ofetchStatus.status === 400 && ofetchStatus.request.includes('groups') && ofetchStatus.method === 'DELETE'">
        <span class="text-sm font-medium text-gray-700">Nie można usunąć grupy, ponieważ jest ona przypisana do zajęć.</span>
      </template>
    </template>
  </base-toast>
</template>
