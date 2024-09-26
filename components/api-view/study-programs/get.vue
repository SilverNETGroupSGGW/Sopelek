<script setup lang="ts">
import { useStudyProgramApi } from '~/stores/api/useStudyProgramApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { StudyProgramResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const studyProgramApi = useStudyProgramApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/StudyProgram/:studyProramId'
const method = 'GET'

interface RequestParameters {
  studyProgramId: string
}

const paramsDefault = {
  studyProgramId: '',
}

const response = ref<ApiResponse<StudyProgramResult> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(`${method} ${endpoint}`, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(`${method} ${endpoint}`, requestParams.value)
})

async function handleExecute() {
  response.value = await studyProgramApi.getStudyProgram(requestParams.value.studyProgramId)
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
      v-model="requestParams.studyProgramId"
      class="my-4 w-72"
      label="Id"
    />
  </api-view-common-template>
</template>
