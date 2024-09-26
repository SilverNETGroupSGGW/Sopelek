<script setup lang="ts">
import { useSubjectApi } from '~/stores/api/useSubjectApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'
import type { SubjectExtendedResult } from '~/types/apiResults/subjects/SubjectExtendedResult'

const subjectApi = useSubjectApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/Subjects/schedule/:scheduleId/extended'
const method = 'GET'

interface RequestParameters {
  scheduleId: string
}

const paramsDefault = {
  scheduleId: '',
}

const response = ref<ApiResponse<SubjectExtendedResult[]> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(endpoint, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(endpoint, requestParams.value)
})

async function handleExecute() {
  response.value = await subjectApi.getSubjectExtendedForSchedule(requestParams.value.scheduleId)
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
      class="my-4 w-72"
      label="Schedule Id"
    />
  </api-view-common-template>
</template>
