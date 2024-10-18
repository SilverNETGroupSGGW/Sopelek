<script setup lang="ts">
import { IconAt, IconKey } from '@tabler/icons-vue'
import { useAuthNavigation } from '~/stores/signin/useAuthNavigation'
import { useSignUp } from '~/stores/signin/useSignUp'

const authNavigation = useAuthNavigation()
const signUp = useSignUp()
</script>

<template>
  <form class="w-full" @submit.prevent="signUp.handleSignUp()">
    <div class="mb-4 space-y-5">
      <base-input
        v-model="signUp.email"
        :icon="IconAt"
        type="email"
        placeholder="adres email"
        label="Adres e-mail"
        autocomplete="email"
      />
      <base-input
        v-model="signUp.password"
        :icon="IconKey"
        type="password"
        placeholder="hasło"
        label="Hasło"
        autocomplete="off"
      />
      <base-input
        v-model="signUp.confirmPassword"
        :icon="IconKey"
        type="password"
        placeholder="potwierdź hasło"
        label="Potwierdź hasło"
        autocomplete="off"
      />
    </div>

    <div class="mb-6 flex w-full justify-end">
      <signin-partial-link-button
        text="Zaloguj się"
        @click="authNavigation.navigateTo('signin')"
      />
      <signin-partial-separator character="|" />
      <signin-partial-link-button
        text="Zapomniałeś hasła?"
        @click="authNavigation.navigateTo('forgotPassword')"
      />
    </div>

    <div class="flex w-full justify-end">
      <base-button
        class="mr-2"
        variant="secondary"
        :disabled="authNavigation.isSubmitting"
        :loading="authNavigation.isSubmitting"
        to="/"
      >
        Strona Główna
      </base-button>
      <base-button
        variant="primary"
        type="submit"
        :disabled="authNavigation.isSubmitting"
        :loading="authNavigation.isSubmitting"
      >
        Utwórz Konto
      </base-button>
    </div>
  </form>
</template>
