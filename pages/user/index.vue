<script setup lang="ts">
  import { IconKey } from '@tabler/icons-vue'

  const account = useAccount()
  await account.get()

  const oldPassword = ref('')
  const newPassword = ref('')

  const isSubmitting = ref(false)

  async function changePassword() {
    isSubmitting.value = true
    await account.changePassword(oldPassword.value, newPassword.value)
    isSubmitting.value = false
  }
</script>

<template>
  <section class="px-12 py-9">
    <header class="mb-4">
      <h1 class="mb-2 text-4xl font-bold text-gray-900">
        Konto użytkownika
      </h1>
      <p class=" text-gray-700">
        Witaj w panelu użytkownika. Tutaj znajdziesz infoirmacje i ustawienia dotyczące Twojego konta.
      </p>
    </header>

    <section class="mb-4">
      <h2 class="mb-2 text-3xl font-bold text-gray-900">
        Dane użytkownika
      </h2>
      <p class="text-gray-700">
        <strong>Email: </strong> {{ account.data?.email ?? 'Brak danych' }}<br>
        <strong>Nazwa: </strong> {{ account.data?.userName ?? 'Brak danych' }}<br>
        <strong>Data utworzenia: </strong> {{ account.data?.createdAt ?? 'Brak danych' }}<br>
        <strong>Data ostatniej aktualizacji: </strong> {{ account.data?.updatedAt ?? 'Brak danych' }}
      </p>
    </section>

    <section class="mb-4">
      <h2 class="mb-2 text-3xl font-bold text-gray-900">
        Role
      </h2>
      <ul class="text-gray-700">
        <li v-for="role in account.data?.roles" :key="role">
          - {{ role }}
        </li>
      </ul>
    </section>

    <section>
      <h2 class="mb-2 text-3xl font-bold text-gray-900">
        Zmiana hasła
      </h2>
      <form class="space-y-4" @submit.prevent="changePassword()">
        <base-input v-model="oldPassword" label="Stare hasło" :icon="IconKey" type="password" />
        <base-input v-model="newPassword" label="Nowe hasło" :icon="IconKey" type="password" />
        <base-button variant="primary" type="submit" :loading="isSubmitting" :disabled="isSubmitting">
          Zmień hasło
        </base-button>
      </form>
    </section>
  </section>
</template>
