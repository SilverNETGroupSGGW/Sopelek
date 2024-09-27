<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useOrganizationApi } from '~/stores/api/useOrganizationsApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { OrganizationResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const organizationApi = useOrganizationApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/Organizations/:organizationId'
const method = 'GET'

interface RequestParameters {
  organizationId: string
}

const paramsDefault = {
  organizationId: '',
}

const response = ref<ApiResponse<OrganizationResult> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(`${method} ${endpoint}`, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(`${method} ${endpoint}`, requestParams.value)
})

async function handleExecute() {
  response.value = await organizationApi.getOrganization(requestParams.value.organizationId)
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
      v-model="requestParams.organizationId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
