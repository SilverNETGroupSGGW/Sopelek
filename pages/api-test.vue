<script setup lang="ts">
import { useAuthApi } from '~/stores/api/useAuthApi'

definePageMeta({
  layout: 'empty',
})

const authApi = useAuthApi()

const login = ref('fabbbian@interia.pl')
const password = ref('')

const resposne = ref('')

async function getTokens() {
  const r = await authApi.getTokensAsync(login.value, password.value)
  resposne.value = JSON.stringify(r)
}
</script>

<template>
  <h1>Api test exaple</h1>

  <p> Click button to invoke login request</p>

  <br>

  <BaseInput v-model="login" label="Login" />
  <br>
  <BaseInput v-model="password" label="Password" />

  <br>
  <BaseButton variant="primary" @click="getTokens()">
    Get tokens
  </BaseButton>

  <br>
  <div> Response: </div>

  <br>
  <div>{{ resposne }}</div>
</template>
