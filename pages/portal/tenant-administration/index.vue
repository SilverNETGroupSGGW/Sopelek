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
          <utils-link-card
            link="/portal/tenant-administration/subject-types"
            header-text="Typy zajęć"
            messsage-text="W tym miejscu możesz definiować lub zmieniać typy zajęć dostępne w tenancie."
          />

          <utils-link-card
            link="/portal/tenant-administration/classroom-types"
            header-text="Typy sal wykładowych"
            messsage-text="W tym miejscu możesz definiować lub zmieniać typy sal dostępne w tenancie."
          />
        </div>
      </div>
    </div>

    <layout-footer />
  </div>
</template>
