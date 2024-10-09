<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useUserApi } from '~/stores/api/useUserApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const userApi = useUserApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = '/api/Users/:userId/change-tenant/:tenantId'

interface RequestParameters {
  userId: string
  tenantId: string
}

const paramsDefault = {
  userId: '',
  tenantId: '',
}

const response = ref<ApiResponse<void> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(endpoint, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(endpoint, requestParams.value)
})

async function handleExecute() {
  response.value = await userApi.changeTenant(
    requestParams.value.userId,
    requestParams.value.tenantId,
  )
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
      label="User Id"
      :icon="IconKey"
    />

    <base-input
      v-model="requestParams.tenantId"
      class="my-4 w-72"
      label="Tenant Id"
    />
  </api-view-common-template>
</template>
