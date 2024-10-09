<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { useStudySemesterApi } from '~/stores/api/useStudySemesterApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'
import type { StudySemesterResult } from '~/types/apiResults/studySemester/StudySemesterResult'

const studySemesterApi = useStudySemesterApi()
const apiViewParameters = useApiViewRequestParameters()
const toast = useToast()

const method = 'POST'
const endpoint = 'api/StudyProgram'

const bodyTemplate = {
  year: 0,
  semester: 0,
  startDate: '2024-01-01T12:00:00.000Z',
  studyProgramId: '',
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

const response = ref<ApiResponse<StudySemesterResult> | null>(null)

async function handleExecute() {
  try {
    const studySemester: StudySemesterResult = JSON.parse(requestParams.value.body)
    response.value = await studySemesterApi.createStudySemester(studySemester)
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
