<script setup lang="ts">
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import { useAuthApi } from '~/stores/api/useAuthApi'
import type { LoginResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const authApi = useAuthApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/tokens/login'

interface RequestParameters {
  username: string
  password: string
  deviceToken: string
}

const paramsDefault = {
  username: '',
  password: '',
  deviceToken: '',
}

const response = ref<ApiResponse<LoginResult> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(endpoint, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(endpoint, requestParams.value)
})

async function handleExecute() {
  try {
    response.value = await authApi.getTokensAsync(
      requestParams.value.username,
      requestParams.value.password,
      requestParams.value.deviceToken,
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
    :endpoint="endpoint"
    :response="response"
    @execute="handleExecute"
    @clear="handleClear"
  >
    <base-input
      v-model="requestParams.username"
      class="my-4 w-96"
      label="Username"
    />

    <base-input
      v-model="requestParams.password"
      class="my-4 w-96"
      label="Password"
    />

    <base-input
      v-model="requestParams.deviceToken"
      class="my-4 w-96"
      label="DeviceToken (Optional)"
    />
  </api-view-common-template>
</template>
