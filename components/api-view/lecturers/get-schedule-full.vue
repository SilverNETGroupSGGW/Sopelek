<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useLecturerApi } from '~/stores/api/useLecturerApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { LecturerResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const lecturerApi = useLecturerApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/Lecturers/:lecturerId/schedule/full'
const method = 'GET'

interface RequestParameters {
  lecturerId: string
}

const paramsDefault = {
  lecturerId: '',
}

const response = ref<ApiResponse<LecturerResult[]> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(`${method} ${endpoint}`, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(`${method} ${endpoint}`, requestParams.value)
})

async function handleExecute() {
  response.value = await lecturerApi.getLecturerSchedule(requestParams.value.lecturerId)
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
      v-model="requestParams.lecturerId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
