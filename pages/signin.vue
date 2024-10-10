<script setup lang="ts">
import { IconAt, IconKey } from '@tabler/icons-vue'
import { useToast } from 'vue-toastification'

definePageMeta({
  layout: 'user',
})

const session = useSession()
const toast = useToast()

const email = ref<string>('')
const password = ref<string>('')
const isSubmitting = ref<boolean>(false)

async function handleFormSubmit() {
  isSubmitting.value = true
  const createSessionResult = await session.createSession(email.value, password.value)
  isSubmitting.value = false

  if (createSessionResult.status === 'not created') {
    toast.error(`Próba logowania nie powiodła się`)
    return Promise.reject(createSessionResult.notCreatedReason)
  }

  toast.success(`Zalogowano pomyślnie`)
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
