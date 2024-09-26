<script setup lang="ts">
import { useStudySemesterApi } from '~/stores/api/useStudySemesterApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'
import type { StudySemesterResult } from '~/types/apiResults/studySemester/StudySemesterResult'

const studySemesterApi = useStudySemesterApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/StudySemesters/:id'
const method = 'GET'

interface RequestParameters {
  studySemesterId: string
}

const paramsDefault = {
  studySemesterId: '',
}

const response = ref<ApiResponse<StudySemesterResult> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(endpoint, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(endpoint, requestParams.value)
})

async function handleExecute() {
  response.value = await studySemesterApi.getStudySemester(requestParams.value.studySemesterId)
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
      v-model="requestParams.studySemesterId"
      class="my-4 w-72"
      label="Id"
    />
  </api-view-common-template>
</template>
