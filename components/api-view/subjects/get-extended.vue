<script setup lang="ts">
import { useSubjectApi } from '~/stores/api/useSubjectApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'
import type { SubjectExtendedResult } from '~/types/apiResults/subjects/SubjectExtendedResult'

const subjectApi = useSubjectApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/Subjects/:subjectId/extended'
const method = 'GET'

interface RequestParameters {
  subjectId: string
}

const paramsDefault = {
  subjectId: '',
}

const response = ref<ApiResponse<SubjectExtendedResult> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(endpoint, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(endpoint, requestParams.value)
})

async function handleExecute() {
  response.value = await subjectApi.getSubjectExtended(requestParams.value.subjectId)
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
      v-model="requestParams.subjectId"
      class="my-4 w-72"
      label="Id"
    />
  </api-view-common-template>
</template>
