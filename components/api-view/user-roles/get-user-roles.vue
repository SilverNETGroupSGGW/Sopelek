<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import { useUserRolesApi } from '~/stores/api/useUserRolesApi'
import type { RoleResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const userRolesApi = useUserRolesApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = '/api/UsersRoles/:userId'

interface RequestParameters {
  userId: string
}

const paramsDefault = {
  userId: '',
}

const response = ref<ApiResponse<RoleResult[]> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(endpoint, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(endpoint, requestParams.value)
})

async function handleExecute() {
  response.value = await userRolesApi.getUserRolesAsync(requestParams.value.userId)
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
  </api-view-common-template>
</template>
