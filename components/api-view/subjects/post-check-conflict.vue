<script setup lang="ts">
import { useSubjectApi } from '~/stores/api/useSubjectApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'
import type { SubjectConflictQuery } from '~/types/apiResults/subjects/SubjectConflictQuery'
import type { SubjectConflictsResult } from '~/types/apiResults/subjects/SubjectConflictResult'

const subjectApi = useSubjectApi()
const apiViewParameters = useApiViewRequestParameters()
const method = 'POST'
const endpoint = 'api/Subjects/check-conflict'

const bodyTemplate = {
  scheduleId: '',
  groups: [''],
  dayOfWeek: 'Monday',
  startTime: '12:00:00',
  duration: '01:30:00',
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

const response = ref<ApiResponse<SubjectConflictsResult> | null>(null)

async function handleExecute() {
  try {
    const query: SubjectConflictQuery = JSON.parse(requestParams.value.body)
    response.value = await subjectApi.checkSubjectConflicts(query)
  }
  catch (error) {
    // Notification todo
    console.log(error)
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
