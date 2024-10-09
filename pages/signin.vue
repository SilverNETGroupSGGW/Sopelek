<script setup lang="ts">
import { IconAt, IconKey } from '@tabler/icons-vue'
import { useAuthApi } from '~/stores/api/useAuthApi'

definePageMeta({
  layout: 'user',
})

const authApi = useAuthApi()

const email = ref<string>('')
const password = ref<string>('')
const isSubmitting = ref<boolean>(false)

async function handleFormSubmit() {
  isSubmitting.value = true
  const response = await authApi.getTokensAsync(email.value, password.value)
  isSubmitting.value = false

  if (response.hasError) {
    return Promise.reject(response.errorMessage)
  }

  useCookie('accessToken').value = response.data?.accessToken
  useCookie('refreshToken').value = response.data?.refreshToken

  await navigateTo('/portal/')
}
</script>

<template>
  <div class="flex h-full flex-col justify-center bg-white px-16">
    <h1 class="mb-2 text-left text-3xl font-bold text-gray-900">
      Witamy!
    </h1>
    <p class="mb-6 text-balance text-left text-gray-700">
      Zaloguj się za pomocą swojego maila.
    </p>

    <form class="w-full" @submit.prevent="handleFormSubmit">
      <div class="mb-8 space-y-5">
        <base-input
          v-model="email"
          :icon="IconAt"
          type="email"
          placeholder="pXXXXXX@sggw.edu.pl"
          label="Adres e-mail"
          autocomplete="email"
        />
        <base-input
          v-model="password"
          :icon="IconKey"
          type="password"
          placeholder="********"
          label="Hasło"
          autocomplete="off"
        />
      </div>

      <div class="flex w-full justify-end">
        <base-button
          class="mr-2"
          variant="secondary"
          :disabled="isSubmitting"
          :loading="isSubmitting" to="/"
        >
          Powrót
        </base-button>
        <base-button
          variant="primary"
          type="submit"
          :disabled="isSubmitting"
          :loading="isSubmitting"
        >
          Zaloguj się
        </base-button>
      </div>
    </form>
  </div>
</template>
