<script setup lang="ts">
import { useExampleTenantFactoryApi } from '~/stores/api/useExampleTenantFactoryApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'
import type { ExampleTenantResult } from '~/types/apiResults/ExampleTenantResult'

const exampleTenantFactoryApi = useExampleTenantFactoryApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/ExampleTenantFactory'
const method = 'POST'

interface RequestParameters {
  tenantName: string
}

const paramsDefault = {
  tenantName: '',
}

const response = ref<ApiResponse<ExampleTenantResult> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(`${method} ${endpoint}`, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(`${method} ${endpoint}`, requestParams.value)
})

async function handleExecute() {
  try {
    response.value = await exampleTenantFactoryApi.createExampleTenant(requestParams.value.tenantName)
  }
  catch (error) {
    // Notification todo
  }
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
      v-model="requestParams.tenantName"
      class="my-4 w-full"
      label="Body"
    />
  </api-view-common-template>
</template>
