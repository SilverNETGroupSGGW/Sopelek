<script setup lang="ts">
const router = useRouter()
const toasts = useToasts()

if (router.options.history.state?.back === '/signin') {
  toasts.addToast({
    type: 'success',
    message: 'Witamy w aplikacji!',
  })
}
</script>

<template>
  <div class="px-12 py-9">
    <div class="mb-8">
      <h1 class="mb-4 text-4xl font-bold text-gray-900">
        Plan SGGW
      </h1>
      <p class="mb-6 text-gray-700">
        Witaj w aplikacji Plan SGGW. Po lewej stronie znajduje się nawigacja strony.
      </p>

      <div class="flex flex-col gap-2">
        <div class="grid auto-rows-[1fr] grid-cols-3 gap-6">
          <NuxtLink to="/schedules" class="group w-full">
            <div class="h-full cursor-pointer rounded-lg border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg group-hover:bg-indigo-600">
              <h2 class="mb-2 block text-2xl font-bold text-gray-700 transition-colors duration-200 group-hover:text-white">
                Plany zajęć
              </h2>
              <p class="text-gray-600 group-hover:text-white">
                W tym miejscu możesz sprawdzić plany zajęć dla wybranych kierunków studiów.
              </p>
            </div>
          </NuxtLink>

          <NuxtLink to="/lecturers" class="group w-full">
            <div class="h-full cursor-pointer rounded-lg border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg group-hover:bg-indigo-600">
              <h2 to="/lecturers" class="mb-2 block text-2xl font-bold text-gray-700 transition-colors duration-200 group-hover:text-white">
                Prowadzący
              </h2>
              <p class="text-gray-600 group-hover:text-white">
                W tym miejscu możesz sprawdzić prowadzących. Lista jest globalna i obejmuje Bazę Wiedzy SGGW.
              </p>
            </div>
          </NuxtLink>

          <NuxtLink to="/classrooms" class="group w-full">
            <div class="h-full cursor-pointer rounded-lg border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg group-hover:bg-indigo-600">
              <h2 to="/classrooms" class="mb-2 block text-2xl font-bold text-gray-700 transition-colors duration-200 group-hover:text-white">
                Sale
              </h2>
              <p class="text-gray-600 group-hover:text-white">
                W tym miejscu możesz sprawdzić sale.
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="mb-1">
      <h2 class="mb-6 text-3xl font-bold text-gray-900">
        Co planujemy?
      </h2>

      <div class="flex gap-6">
        <div class="w-full rounded-lg border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg">
          <p class="mb-2 block text-2xl font-bold text-gray-700 transition-colors duration-200 hover:text-gray-900">
            Konflikty
          </p>
          <p class="text-gray-600">
            System do wykrywania konfliktów w planach zajęć, dotyczyć to będzie sal, prowadzących oraz grup.
          </p>
        </div>

        <div class="w-full rounded-lg border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg">
          <p class="mb-2 block text-2xl font-bold text-gray-700 transition-colors duration-200 hover:text-gray-900">
            Tryb publikacji
          </p>
          <p class="text-gray-600">
            Możliwość tworzenia draftów oraz oficjalnych planów zajęć, które zarazem będą dostępne w aplikacji mobilnej.
          </p>
        </div>

        <div class="w-full rounded-lg border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg">
          <p class="mb-2 block text-2xl font-bold text-gray-700 transition-colors duration-200 hover:text-gray-900">
            Definiowanie zajęć
          </p>
          <p class="text-gray-600">
            Możliwość definiowania zajęć przedmiotu, które będą wyświetlane w planie. Przydatne gdy zajęcia trwają np. 2 tygodnie.
          </p>
        </div>
      </div>
    </div>

    <layout-default-footer />
  </div>
</template>
