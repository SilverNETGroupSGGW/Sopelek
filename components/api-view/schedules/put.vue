<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { useScheduleApi } from '~/stores/api/useScheduleApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
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
const toast = useToast()

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
    toast.error(`Błąd parsowania danych wejściowych zapytania API\r\n${error}`)
  }
}

async function handleClear() {
  response.value = null
}
</script>

<template>
  <api-view-common-template
    method="POST"
    :endpoint="endpoint"
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
