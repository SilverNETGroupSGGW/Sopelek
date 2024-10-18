<script setup lang="ts">
import { IconAt } from '@tabler/icons-vue'
import { useAuthNavigation } from '~/stores/signin/useAuthNavigation'
import { useResetPasswrod } from '~/stores/signin/useResetPassword'

const authNavigation = useAuthNavigation()
const resetPassword = useResetPasswrod()
</script>

<template>
  <form class="w-full" @submit.prevent="resetPassword.resetPassword()">
    <div class="mb-4 space-y-5">
      <base-input
        v-model="resetPassword.email"
        :icon="IconAt"
        type="email"
        placeholder="email"
        label="Adres e-mail"
        autocomplete="email"
      />
    </div>

    <div class="mb-6 flex w-full justify-end">
      <signin-partial-link-button
        text="Powrót do logowania"
        @click="authNavigation.navigateTo('signin')"
      />
      <signin-partial-separator character="|" />
      <signin-partial-link-button
        text="Aktywuj kod"
        @click="authNavigation.navigateTo('activateResetPassword')"
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
