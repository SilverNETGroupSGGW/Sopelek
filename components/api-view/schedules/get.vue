<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import { useScheduleApi } from '~/stores/api/useScheduleApi'
import type { ScheduleResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const scheduleApi = useScheduleApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/schedules/:id'

interface RequestParameters {
  scheduleId: string
}

const paramsDefault = {
  scheduleId: '',
}

const response = ref<ApiResponse<ScheduleResult> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(endpoint, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(endpoint, requestParams.value)
})

async function handleExecute() {
  response.value = await scheduleApi.getSchedule(requestParams.value.scheduleId)
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
      v-model="requestParams.scheduleId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
