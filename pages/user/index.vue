<script setup lang="ts">
// Account
const account = useAccount()
await account.get()

const oldPassword = ''
const newPassword = ''
</script>

<template>
  <div class="px-12 py-9">
    <h1 class="mb-4 text-4xl font-bold text-gray-900">
      Konto użytkownika
    </h1>

    <p class="mb-6 text-gray-700">
      Witaj w panelu użytkownika. Tutaj znajdziesz infoirmacje i ustawienia dotyczące Twojego konta.
    </p>

    <div class="mb-1">
      <h2 class="mb-6 text-3xl font-bold text-gray-900">
        Dane użytkownika
      </h2>

      <p class="mb-6 text-gray-700">
        <span class="font-semibold">Email: </span>

        <span class="text-gray-700">
          {{ account.data?.email ?? 'Brak danych' }}
        </span>

        <br>

        <span class="font-semibold">Nazwa: </span>

        <span class="text-gray-700">
          {{ account.data?.userName ?? 'Brak danych' }}
        </span>

        <br>

        <span class="font-semibold">Data utworzenia: </span>

        <span class="text-gray-700">
          {{ account.data?.createdAt ?? 'Brak danych' }}
        </span>

        <br>

        <span class="font-semibold">Data ostatniej aktualizacji: </span>

        <span class="text-gray-700">
          {{ account.data?.updatedAt ?? 'Brak danych' }}
        </span>
      </p>
    </div>

    <div class="mb-1">
      <h2 class="mb-6 text-3xl font-bold text-gray-900">
        Role
      </h2>

      <ul class="mb-6 text-gray-700">
        <li v-for="role in account.data?.roles" :key="role">
          <span class="text-gray-700">
            - {{ role }}
          </span>
        </li>
      </ul>
    </div>

    <div class="mb-1">
      <h2 class="mb-6 text-3xl font-bold text-gray-900">
        Zmiana hasła
      </h2>

      <div class="mb-6">
        <div class="mb-4">
          <label for="oldPassword" class="block text-gray-700">
            Stare hasło
          </label>

          <input
            id="oldPassword"
            v-model="oldPassword"
            type="password"
            class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
          >
        </div>

        <div class="mb-4">
          <label for="confirmPassword" class="block text-gray-700">
            Nowe hasło
          </label>

          <input
            id="newPassword"
            v-model="newPassword"
            type="password"
            class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
          >
        </div>

        <base-button variant="primary" @click="account.changePassword(newPassword, newPassword)">
          Zmień hasło
        </base-button>

        <small class="block w-full text-right text-gray-700">
          Projekt realizowany przez <a href="mailto:kontakt@silver.sggw.pl" class="font-semibold transition-colors duration-200 hover:text-gray-900">Koło Naukowe Informatyków SGGW Silver .NET</a>
        </small>
      </div>
    </div>
  </div>
</template>
