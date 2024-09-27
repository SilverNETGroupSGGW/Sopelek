<script setup lang="ts">
import { useScheduleFileGeneratorApi } from '~/stores/api/useScheduleFileGeneratorApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const scheduleGeneratorApi = useScheduleFileGeneratorApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/schedules'
const method = 'POST'

interface RequestParameters {
  scheduleId: string
}

const paramsDefault = {
  scheduleId: '',
}

const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(`${method} ${endpoint}`, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(`${method} ${endpoint}`, requestParams.value)
})

const response = ref<ApiResponse<Blob> | null>(null)

async function handleExecute() {
  try {
    response.value = await scheduleGeneratorApi.generateScheduleFile(requestParams.value.scheduleId)
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
      v-model="requestParams.scheduleId"
      class="my-4 w-full"
      label="Schedule Id"
    />
  </api-view-common-template>
</template>
