<script setup lang="ts">
const account = useAccount()
await account.get()

if (!account.data?.roles.includes('SystemAdministrator')) {
  await navigateTo('/')
}
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
          <utils-link-card
            link="/portal/administration/organizations"
            header-text="Organizacje"
            messsage-text="W tym miejscu możesz zarządzać lub dodawać nowe organizacje."
          />

          <utils-link-card
            link="/portal/administration/tenants"
            header-text="Tenanty"
            messsage-text="W tym miejscu możesz zarządzać tenantami."
          />

          <utils-link-card
            link="/portal/administration/users"
            header-text="Użytkownicy"
            messsage-text="W tym miejscu możesz zarządzać użytkownikami aplikacji."
          />

          <utils-link-card
            link="/portal/administration/api-management"
            header-text="Zarządzanie API"
            messsage-text="W tym miejscu możesz przetestować API aplikacji."
          />
        </div>
      </div>
    </div>

    <layout-footer />
  </div>
</template>
