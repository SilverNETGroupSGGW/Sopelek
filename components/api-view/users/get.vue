<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useUserApi } from '~/stores/api/useUserApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { UserResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const userApi = useUserApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = '/api/users/:userId'

interface RequestParameters {
  userId: string
}

const paramsDefault = {
  userId: '',
}

const response = ref<ApiResponse<UserResult> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(endpoint, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(endpoint, requestParams.value)
})

async function handleExecute() {
  response.value = await userApi.getUser(requestParams.value.userId)
}

async function handleClear() {
  response.value = null
}
</script>

<template>
  <api-view-common-template
    method="GET"
    :endpoint="endpoint"
    :response="response"
    @execute="handleExecute"
    @clear="handleClear"
  >
    <base-input
      v-model="requestParams.userId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
