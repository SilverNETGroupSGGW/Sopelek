<script setup lang="ts">
import { useActivateAccount } from '~/stores/signin/useActivateAccount'
import { useAuthNavigation } from '~/stores/signin/useAuthNavigation'

definePageMeta({
  layout: 'user',
})

const route = useRoute()
const authNavigation = useAuthNavigation()
const activateAccount = useActivateAccount()

if (route.query.page) {
  const page = route.query.page as string
  await authNavigation.navigateToByString(page)
}

if (route.query.email && route.query.code) {
  const email = route.query.email as string
  const code = route.query.code as string
  await activateAccount.handleAccountActivation(email, code)
}
</script>

<template>
  <div
    v-if="authNavigation.isSignInMode"
    class="flex h-full flex-col justify-center bg-white px-16"
  >
    <signin-partial-header text="Witamy!" />
    <signin-partial-description text="Zaloguj się za pomocą swojego adresu email." />

    <signin-login-form />
  </div>

  <div
    v-else-if="authNavigation.isSignUpMode"
    class="flex h-full flex-col justify-center bg-white px-16"
  >
    <signin-partial-header text="Tworzenie Konta" />
    <signin-partial-description text="Zarejestruj się za pomocą swojego maila." />

    <signin-register-form />
  </div>

  <div
    v-else-if="authNavigation.isForgotPasswordMode"
    class="flex h-full flex-col justify-center bg-white px-16"
  >
    <signin-partial-header text="Zresetuj hasło" />
    <signin-partial-description text="Wyślij wiadomość email z linkiem do resetu hasła na adres konta." />

    <signin-forgot-password-form />
  </div>

  <div
    v-else-if="authNavigation.isActivateResetPasswordMode"
    class="flex h-full flex-col justify-center bg-white px-16"
  >
    <signin-partial-header text="Hasło zostało zresetowane" />
    <signin-partial-description text="Na twój adres email została wysłana wiadomość z kodem i linkiem do resetu hasła." />

    <signin-activate-reset-password-form />
  </div>
</template>
