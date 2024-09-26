<script setup lang="ts">
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import { useSubjectTypeApi } from '~/stores/api/useSubjectTypeApi'
import type { SubjectTypeResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const subjectTypeApi = useSubjectTypeApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/SubjectTypes/byTenantId/:tenantId'
const method = 'GET'

interface RequestParameters {
  tenantId: string
}

const paramsDefault = {
  tenantId: '',
}

const response = ref<ApiResponse<SubjectTypeResult[]> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(endpoint, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(endpoint, requestParams.value)
})

async function handleExecute() {
  response.value = await subjectTypeApi.getSubjectTypeByTenantId(requestParams.value.tenantId)
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
      v-model="requestParams.tenantId"
      class="my-4 w-72"
      label="Tenant Id"
    />
  </api-view-common-template>
</template>
