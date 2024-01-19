<script setup lang="ts">
const { data } = useFetch(`https://api.github.com/repos/SilverNETGroupSGGW/plansggw/branches/main`)
</script>

<template>
  <div class="flex h-screen flex-col items-center justify-center px-32">
    <h1 class="mb-4 text-5xl font-bold text-gray-900">
      Plan SGGW
    </h1>
    <p class="mb-6 text-gray-700">
      Witaj w aplikacji Plan SGGW. Po lewej stronie znajduje się nawigacja strony.
    </p>

    <div class="flex flex-col gap-2">
      <div class="flex gap-6">
        <div class="w-full cursor-pointer rounded-lg border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg">
          <NuxtLink to="/schedules" class="mb-2 block text-2xl font-bold text-gray-700 transition-colors duration-200 hover:text-gray-900">
            Plany zajęć
          </NuxtLink>
          <p class="text-gray-600">
            W tym miejscu możesz sprawdzić plany zajęć dla wybranych kierunków studiów.
          </p>
        </div>

        <div class="w-full cursor-pointer rounded-lg border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg">
          <NuxtLink to="/lecturers" class="mb-2 block text-2xl font-bold text-gray-700 transition-colors duration-200 hover:text-gray-900">
            Prowadzący
          </NuxtLink>
          <p class="text-gray-600">
            W tym miejscu możesz sprawdzić prowadzących. Lista jest globalna i obejmuje Bazę Wiedzy SGGW.
          </p>
        </div>

        <div class="w-full cursor-pointer rounded-lg border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg">
          <NuxtLink to="/classrooms" class="mb-2 block text-2xl font-bold text-gray-700 transition-colors duration-200 hover:text-gray-900">
            Sale
          </NuxtLink>
          <p class="text-gray-600">
            W tym miejscu możesz sprawdzić sale.
          </p>
        </div>
      </div>

      <small class="text-right text-gray-700">
        Projekt realizowany przez <a href="mailto:kontakt@silver.sggw.pl" class="font-semibold transition-colors duration-200 hover:text-gray-900">Koło Naukowe Informatyków SGGW.</a> Ostatnia aktualizacja: {{ new Date((data as any).commit.commit.author.date).toLocaleString() }}
      </small>
    </div>
  </div>
</template>
