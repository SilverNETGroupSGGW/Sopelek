<script setup lang="ts">
import { InboxIcon, KeyIcon } from '@heroicons/vue/20/solid'

const supabase = useSupabaseClient()

definePageMeta({
  layout: 'user',
})

const form = reactive({
  email: '',
  password: '',
})

const isSubmitting = ref(false)

async function handleFormSubmit() {
  isSubmitting.value = true

  const { data } = await supabase.auth.signInWithPassword({
    email: form.email,
    password: form.password,
  })

  if (data.user)
    await navigateTo('/study-plans')

  isSubmitting.value = false
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
        <base-input v-model="form.email" :icon="InboxIcon" type="email" placeholder="pXXXXXX@sggw.edu.pl" label="Adres e-mail" autocomplete="false" />
        <base-input v-model="form.password" :icon="KeyIcon" type="password" placeholder="********" label="Hasło" autocomplete="false" />
      </div>

      <div class="flex w-full justify-end">
        <base-button variant="primary" type="submit" :disabled="isSubmitting" :loading="isSubmitting">
          Zaloguj się
        </base-button>
      </div>
    </form>
  </div>
</template>
