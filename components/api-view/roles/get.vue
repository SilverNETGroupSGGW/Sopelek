<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useRolesApi } from '~/stores/api/useRolesApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { RoleResult, ScheduleResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const rolesApi = useRolesApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/Roles/:userId'
const method = 'GET'

interface RequestParameters {
  userId: string
}

const paramsDefault = {
  userId: '',
}

const response = ref<ApiResponse<RoleResult[]> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(`${method} ${endpoint}`, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(`${method} ${endpoint}`, requestParams.value)
})

async function handleExecute() {
  response.value = await rolesApi.getUserRoles(requestParams.value.userId)
}

async function handleClear() {
  response.value = null
}
</script>

<template>
  <api-view-common-template
    :method="method"
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
  </api-view-common-template>
</template>
