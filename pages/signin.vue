<script setup lang="ts">
import { InboxIcon, KeyIcon } from '@heroicons/vue/20/solid'

interface User {
  email: string
  password: string
  deviceToken: string
}

interface UserResponse {
  refreshToken: string
  accessToken: string
}

definePageMeta({
  layout: 'user',
})

const router = useRouter()

const form = reactive<User>({
  email: '',
  password: '',
  deviceToken: '',
})

const isSubmitting = ref(false)

async function handleFormSubmit() {
  isSubmitting.value = true
  const { refreshToken, accessToken } = await $fetch<UserResponse>('tokens/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
    baseURL: 'https://kampus-sggw-api.azurewebsites.net/api/',
  })
  isSubmitting.value = false

  useCookie('accessToken').value = accessToken
  useCookie('refreshToken').value = refreshToken

  router.push('/lecturers')
}
</script>

<template>
  <div class="flex w-96 flex-col items-center rounded-2xl border-2 border-gray-200 bg-white px-8 py-12">
    <h1 class="mb-2 text-center text-3xl font-bold text-gray-900">
      Witamy!
    </h1>
    <p class="text-balance mb-6 text-center text-gray-700">
      Zaloguj się za pomocą swojego maila.
    </p>
    <form class="w-full" @submit.prevent="handleFormSubmit">
      <div class="mb-8 space-y-5">
        <base-input v-model="form.email" :icon="InboxIcon" type="email" placeholder="pXXXXXX@sggw.edu.pl" label="Adres e-mail" autocomplete="false" />
        <base-input v-model="form.password" :icon="KeyIcon" type="password" placeholder="********" label="Hasło" autocomplete="false" />
      </div>

      <div class="flex w-full justify-end">
        <base-button variant="primary" type="submit" :disabled="isSubmitting">
          Zaloguj się
        </base-button>
      </div>
    </form>
  </div>
</template>
