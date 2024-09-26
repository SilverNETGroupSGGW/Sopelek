<script setup lang="ts">
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import { useTenantApi } from '~/stores/api/useTenantApi'
import type { TenantResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const tenantsApi = useTenantApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/Tenants/:tenantId'

interface RequestParameters {
  tenantId: string
}

const paramsDefault = {
  tenantId: '',
}

const response = ref<ApiResponse<TenantResult> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(endpoint, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(endpoint, requestParams.value)
})

async function handleExecute() {
  response.value = await tenantsApi.getTenant(requestParams.value.tenantId)
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
      v-model="requestParams.tenantId"
      class="my-4 w-72"
      label="Id"
    />
  </api-view-common-template>
</template>
