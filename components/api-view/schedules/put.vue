<script setup lang="ts">
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import { useScheduleApi } from '~/stores/api/useScheduleApi'
import type { ScheduleResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const bodyTemplate = {
  id: '',
  name: '',
  isDraft: false,
  studySemesterId: '',
}

const scheduleApi = useScheduleApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/schedules'

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

const response = ref<ApiResponse<ScheduleResult> | null>(null)

async function handleExecute() {
  try {
    const schedule = JSON.parse(requestParams.value.body)
    response.value = await scheduleApi.updateSchedule(schedule)
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
    method="POST"
    endpoint="api/schedules"
    :response="response"
    @execute="handleExecute"
    @clear="handleClear"
  >
    <base-input
      v-model="requestParams.body"
      class="my-4 w-full"
      label="body"
      :multiline="true"
      :multiline-rows-height="8"
    />
  </api-view-common-template>
</template>
