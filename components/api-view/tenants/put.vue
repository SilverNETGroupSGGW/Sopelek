<script setup lang="ts">
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import { useTenantApi } from '~/stores/api/useTenantApi'
import type { TenantResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const tenantsApi = useTenantApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/Tenants'

const bodyTemplate = {
  id: '',
  name: '',
  ownerId: '',
  organizationId: '',
}

interface RequestParameters {
  body: string
}

const paramsDefault = {
  body: JSON.stringify(bodyTemplate, null, 2),
}

const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(endpoint, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(endpoint, requestParams.value)
})

const response = ref<ApiResponse<TenantResult> | null>(null)

async function handleExecute() {
  try {
    const tenant: TenantResult = JSON.parse(requestParams.value.body)
    response.value = await tenantsApi.updateTenant(tenant)
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
    method="PUT"
    :endpoint="endpoint"
    :response="response"
    @execute="handleExecute"
    @clear="handleClear"
  >
    <base-input
      v-model="requestParams.body"
      class="my-4 w-full"
      label="Body"
      :multiline="true"
      :multiline-rows-height="8"
    />
  </api-view-common-template>
</template>
