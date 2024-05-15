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
        Panel Administratora
      </h1>

      <p class="mb-6 text-gray-700">
        Witaj w panelu administora. Znajdziesz tu informacje i ustawienia dostępne tylko dla administratora
        serwisu.
      </p>

      <div class="flex flex-col gap-2">
        <div class="grid auto-rows-[1fr] grid-cols-3 gap-6">
          <NuxtLink to="/administration/organizations" class="group w-full">
            <div class="h-full cursor-pointer rounded-lg border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg group-hover:bg-indigo-600">
              <h2 class="mb-2 block text-2xl font-bold text-gray-700 transition-colors duration-200 group-hover:text-white">
                Organizacje
              </h2>
              <p class="text-gray-600 group-hover:text-white">
                W tym miejscu możesz zarządzać lub dodawać nowe organizacje.
              </p>
            </div>
          </NuxtLink>

          <NuxtLink to="/administration/tenants" class="group w-full">
            <div class="h-full cursor-pointer rounded-lg border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg group-hover:bg-indigo-600">
              <h2 class="mb-2 block text-2xl font-bold text-gray-700 transition-colors duration-200 group-hover:text-white">
                Tenanty
              </h2>
              <p class="text-gray-600 group-hover:text-white">
                W tym miejscu możesz zarządzać tenantami.
              </p>
            </div>
          </NuxtLink>

          <NuxtLink to="/administration/users" class="group w-full">
            <div class="h-full cursor-pointer rounded-lg border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg group-hover:bg-indigo-600">
              <h2 class="mb-2 block text-2xl font-bold text-gray-700 transition-colors duration-200 group-hover:text-white">
                Użytkownicy
              </h2>
              <p class="text-gray-600 group-hover:text-white">
                W tym miejscu możesz zarządzać użytkownikami aplikacji.
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <layout-footer />
  </div>
</template>
