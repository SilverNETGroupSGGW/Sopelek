<script setup lang="ts">
import { IconAt, IconKey } from '@tabler/icons-vue'
import { useAuthNavigation } from '~/stores/signin/useAuthNavigation'
import { useSignIn } from '~/stores/signin/useSignIn'

const authNavigation = useAuthNavigation()
const signIn = useSignIn()
</script>

<template>
  <form class="w-full" @submit.prevent="signIn.handleSignIn()">
    <div class="mb-4 space-y-5">
      <base-input
        v-model="signIn.email"
        :icon="IconAt"
        type="email"
        placeholder="email"
        label="Adres e-mail"
        autocomplete="email"
      />
      <base-input
        v-model="signIn.password"
        :icon="IconKey"
        type="password"
        placeholder="hasło"
        label="Hasło"
        autocomplete="off"
      />
    </div>

    <div class="mb-6 flex w-full justify-end">
      <signin-partial-link-button
        text="Zarejestruj się"
        @click="authNavigation.navigateTo('signup')"
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
        Zaloguj się
      </base-button>
    </div>
  </form>
</template>
