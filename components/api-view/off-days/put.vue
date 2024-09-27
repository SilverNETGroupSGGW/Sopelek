<script setup lang="ts">
import { useOffDaysApi } from '~/stores/api/useOffDayApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { OffDayResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const offDaysApi = useOffDaysApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/OffDay'
const method = 'PUT'

const bodyTemplate = {
  id: '',
  date: '2024-01-01T12:00:00.000Z',
  scope: 'Global',
  reason: '',
  organizationId: '',
  tenantId: '',
  scheduleId: '',
  groupId: '',
}

interface RequestParameters {
  body: string
}

const paramsDefault = {
  body: JSON.stringify(bodyTemplate, null, 2),
}

const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(`${method} ${endpoint}`, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(`${method} ${endpoint}`, requestParams.value)
})

const response = ref<ApiResponse<OffDayResult> | null>(null)

async function handleExecute() {
  try {
    const offDay: OffDayResult = JSON.parse(requestParams.value.body)
    response.value = await offDaysApi.updateOffDay(offDay)
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
