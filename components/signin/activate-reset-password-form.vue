<script setup lang="ts">
import { IconAt, IconKey } from '@tabler/icons-vue'
import { useActivateResetPasswrod } from '~/stores/signin/useActivateResetPassword'
import { useAuthNavigation } from '~/stores/signin/useAuthNavigation'

const activateResetPassword = useActivateResetPasswrod()
const authNavigation = useAuthNavigation()
</script>

<template>
  <form class="w-full" @submit.prevent="activateResetPassword.activateResetPassword()">
    <div class="mb-4 space-y-5">
      <base-input
        v-model="activateResetPassword.email"
        :icon="IconAt"
        type="email"
        placeholder="email"
        label="Adres e-mail"
        autocomplete="email"
      />
      <base-input
        v-model="activateResetPassword.newPassword"
        :icon="IconKey"
        type="password"
        placeholder="nowe hasło"
        label="Hasło"
        autocomplete="off"
      />
      <base-input
        v-model="activateResetPassword.code"
        :icon="IconKey"
        type="code"
        placeholder="kod aktywacyjny"
        label="Kod aktywacyjny"
        autocomplete="off"
      />
    </div>

    <div class="mb-6 flex w-full justify-end">
      <signin-partial-link-button
        text="Powrót do logowania"
        @click="authNavigation.navigateTo('signin')"
      />
    </div>

    <div class="flex w-full justify-end">
      <base-button
        class="mr-2"
        variant="secondary"
        :disabled="authNavigation.isSubmitting"
        :loading="authNavigation.isSubmitting" to="/"
      >
        Strona Główna
      </base-button>
      <base-button
        variant="primary"
        type="submit"
        :disabled="authNavigation.isSubmitting"
        :loading="authNavigation.isSubmitting"
      >
        Zresetuj hasło
      </base-button>
    </div>
  </form>
</template>
