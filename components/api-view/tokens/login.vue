<script setup lang="ts">
import { useAuthApi } from '~/stores/api/useAuthApi'
import type { LoginResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const authApi = useAuthApi()
const response = ref<ApiResponse<LoginResult> | null>(null)

const username = ref<string>('')
const password = ref<string>('')
const deviceToken = ref<string>('')

async function handleExecute() {
  try {
    response.value = await authApi.getTokensAsync(
      username.value,
      password.value,
      deviceToken.value,
    )
  }
  catch (error) {
    // Notification todo
  }
}

async function handleClear() {
  response.value = null
}
</script>

<template>
  <api-view-common-template
    method="POST"
    endpoint="api/tokens/login"
    :response="response"
    @execute="handleExecute"
    @clear="handleClear"
  >
    <base-input
      v-model="username"
      class="my-4 w-96"
      label="Username"
    />

    <base-input
      v-model="password"
      class="my-4 w-96"
      label="Password"
    />

    <base-input
      v-model="deviceToken"
      class="my-4 w-96"
      label="DeviceToken (Optional)"
    />
  </api-view-common-template>
</template>
