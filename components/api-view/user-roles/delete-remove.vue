<script setup lang="ts">
import { useUserRolesApi } from '~/stores/api/useUserRolesApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const userRolesApi = useUserRolesApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/UsersRoles/remove'

interface RequestParameters {
  userId: string
  roleName: string
}

const paramsDefault = {
  userId: '',
  roleName: '',
}

const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(endpoint, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(endpoint, requestParams.value)
})

const response = ref<ApiResponse<void> | null>(null)

async function handleExecute() {
  response.value = await userRolesApi.removeRoleFromUserAsync(
    requestParams.value.roleName,
    requestParams.value.userId,
  )
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
      v-model="requestParams.userId"
      class="my-4 w-full"
      label="User Id"
    />

    <base-input
      v-model="requestParams.roleName"
      class="my-4 w-full"
      label="Role Name"
    />
  </api-view-common-template>
</template>
