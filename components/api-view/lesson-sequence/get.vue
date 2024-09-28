<script setup lang="ts">
import { useLessonSequenceDateTimesGeneratorApi } from '~/stores/api/useLessonSequenceDateTimesGeneratorApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { SequenceDateTimesResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const lessonSequenceGenerator = useLessonSequenceDateTimesGeneratorApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = '/api/LessonsDateTimeSequenceGeneration/:startDateTime/:numberOfDates'
const method = 'GET'

interface RequestParameters {
  startDateTime: string
  numberOfDates: number
}

const paramsDefault = {
  startDateTime: '',
  numberOfDates: 1,
}

const response = ref<ApiResponse<SequenceDateTimesResult> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(`${method} ${endpoint}`, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(`${method} ${endpoint}`, requestParams.value)
})

async function handleExecute() {
  response.value = await lessonSequenceGenerator.generateLessonSequenceDateTimes(
    requestParams.value.startDateTime,
    requestParams.value.numberOfDates,
  )
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
      v-model="requestParams.startDateTime"
      class="my-4 w-72"
      label="startDateTime"
    />

    <base-input
      v-model="requestParams.numberOfDates"
      class="my-4 w-72"
      label="numberOfDates"
    />
  </api-view-common-template>
</template>
