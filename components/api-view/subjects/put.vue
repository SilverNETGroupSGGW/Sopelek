<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { useSubjectApi } from '~/stores/api/useSubjectApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { SubjectResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const subjectApi = useSubjectApi()
const apiViewParameters = useApiViewRequestParameters()
const toast = useToast()

const method = 'PUT'
const endpoint = 'api/Subjects'

const bodyTemplate = {
  id: '',
  name: '',
  scheduleId: '',
  typeId: '',
  startTime: '12:00:00',
  dayOfWeek: 'Monday',
  duration: '01:30:00',
  isRemote: true,
  isConditional: true,
  lecturersIds: [''],
  groupsIds: [''],
  classroomId: '',
  comment: '',
  lessons: [
    {
      startTime: '2024-01-01T12:00:00.000Z',
      duration: '01:30:00',
    },
  ],
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

const response = ref<ApiResponse<SubjectResult> | null>(null)

async function handleExecute() {
  try {
    const subject: SubjectResult = JSON.parse(requestParams.value.body)
    response.value = await subjectApi.updateSubject(subject)
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
