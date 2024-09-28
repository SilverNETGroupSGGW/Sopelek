<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useLessonApi } from '~/stores/api/useLessonApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { LessonResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const lessonApi = useLessonApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/Lessons/subject/:subjectId'
const method = 'GET'

interface RequestParameters {
  subjectId: string
}

const paramsDefault = {
  subjectId: '',
}

const response = ref<ApiResponse<LessonResult[]> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(`${method} ${endpoint}`, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(`${method} ${endpoint}`, requestParams.value)
})

async function handleExecute() {
  response.value = await lessonApi.getLessonsForSubject(requestParams.value.subjectId)
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
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
