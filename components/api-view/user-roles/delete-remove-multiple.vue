<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useToast } from 'vue-toastification'
import { useUserRolesApi } from '~/stores/api/useUserRolesApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const userRolesApi = useUserRolesApi()
const apiViewParameters = useApiViewRequestParameters()
const toast = useToast()

const endpoint = 'api/UsersRoles/remove-multiple'

interface RequestParameters {
  userId: string
  roleName: string
}

const paramsDefault = {
  userId: '',
  roleName: '[]',
}

const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(endpoint, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(endpoint, requestParams.value)
})

const response = ref<ApiResponse<void> | null>(null)

async function handleExecute() {
  try {
    response.value = await userRolesApi.removeRolesFromUserAsync(
      JSON.parse(requestParams.value.roleName),
      requestParams.value.userId,
    )
  }
  catch (error) {
    toast.error(`Błąd parsowania danych wejściowych zapytania API\r\n${error}`)
  }
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
      :icon="IconKey"
    />

    <base-input
      v-model="requestParams.roleName"
      class="my-4 w-full"
      label="Role Name (string['role1', 'role2'])"
      :multiline="true"
      :multiline-rows-height="8"
    />
  </api-view-common-template>
</template>
