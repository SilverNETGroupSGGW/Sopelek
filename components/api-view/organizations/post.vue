<script setup lang="ts">
import { useOrganizationApi } from '~/stores/api/useOrganizationsApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { OrganizationResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const organizationApi = useOrganizationApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/Organizations'
const method = 'POST'

const bodyTemplate = {
  name: '',
}

interface RequestParameters {
  body: string
}

const paramsDefault = {
  body: JSON.stringify(bodyTemplate, null, 2),
}

const response = ref<ApiResponse<OrganizationResult> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(`${method} ${endpoint}`, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(`${method} ${endpoint}`, requestParams.value)
})

async function handleExecute() {
  try {
    const organization: OrganizationResult = JSON.parse(requestParams.value.body)
    response.value = await organizationApi.createOrganization(organization)
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
      v-model="requestParams.body"
      class="my-4 w-full"
      label="Body"
      :multiline="true"
      :multiline-rows-height="10"
    />
  </api-view-common-template>
</template>
