<script setup lang="ts">
const account = useAccount()
await account.get()

if (!account.data?.roles.includes('SystemAdministrator'))
  await navigateTo('/')
</script>

<template>
  <div class="px-12 py-9">
    <div class="mb-8">
      <h1 class="mb-4 text-4xl font-bold text-gray-900">
        Panel System Administratora
      </h1>

      <p class="mb-6 text-gray-700">
        Witaj w panelu system administora. Ten panel jest widoczny tylko właścicielowi organizacji/jednostki.
        Znajdziesz tu informacje i ustawienia na temat konfiguracji i zarządzania organizacją/jednostką.
      </p>

      <div class="flex flex-col gap-2">
        <div class="grid auto-rows-[1fr] grid-cols-3 gap-6">
          <NuxtLink to="/tenant-administration/subject-types" class="group w-full">
            <div
              class="h-full cursor-pointer rounded-lg border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg group-hover:bg-indigo-600"
            >
              <h2
                to="/tenant-administration/subject-types"
                class="mb-2 block text-2xl font-bold text-gray-700 transition-colors duration-200 group-hover:text-white"
              >
                Typy zajęć
              </h2>
              <p class="text-gray-600 group-hover:text-white">
                W tym miejscu możesz definiować lub zmieniać typy zajęć dostępne w organizacji.
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <small class="block w-full text-right text-gray-700">
      Projekt realizowany przez <a
        href="mailto:kontakt@silver.sggw.pl"
        class="font-semibold transition-colors duration-200 hover:text-gray-900"
      >Koło Naukowe Informatyków SGGW
        Silver .NET</a>
    </small>
  </div>
</template>
