<script setup lang="ts">
import { useAuthApi } from '~/stores/api/useAuthApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const authApi = useAuthApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/tokens/revoke'

interface RequestParameters {
  refreshToken: string
}

const paramsDefault = {
  refreshToken: '',
}

const response = ref<ApiResponse<void> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(endpoint, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(endpoint, requestParams.value)
})

async function handleExecute() {
  response.value = await authApi.revokeTokenAsync(requestParams.value.refreshToken)
}

async function handleClear() {
  response.value = null
}
</script>

<template>
  <api-view-common-template
    method="DELETE"
    :endpoint="endpoint"
    :response="response"
    @execute="handleExecute"
    @clear="handleClear"
  >
    <base-input
      v-model="requestParams.refreshToken"
      class="my-4 w-full"
      label="Refresh Token"
      :multiline="true"
      :multiline-rows-height="8"
    />
  </api-view-common-template>
</template>
