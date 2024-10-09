<script setup lang="ts">
import { useUserApi } from '~/stores/api/useUserApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { UserResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const userApi = useUserApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/schedules'

interface RequestParameters {
  email: string
  password: string
}

const paramsDefault = {
  email: '',
  password: '',
}

const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(endpoint, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(endpoint, requestParams.value)
})

const response = ref<ApiResponse<UserResult> | null>(null)

async function handleExecute() {
  response.value = await userApi.createUser(
    requestParams.value.email,
    requestParams.value.password,
  )
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
      v-model="requestParams.email"
      class="my-4 w-full"
      label="Email"
    />

    <base-input
      v-model="requestParams.password"
      class="my-4 w-full"
      label="Password"
    />
  </api-view-common-template>
</template>
