<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useGroupApi } from '~/stores/api/useGroupApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { ClassroomConflictResult } from '~/types/apiResults/classrooms/ClassroomConflictResult'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const groupApi = useGroupApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/Classrooms/:classroomId/dependencies'
const method = 'GET'

interface RequestParameters {
  classroomId: string
}

const paramsDefault = {
  classroomId: '',
}

const response = ref<ApiResponse<ClassroomConflictResult> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(`${method} ${endpoint}`, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(`${method} ${endpoint}`, requestParams.value)
})

async function handleExecute() {
  response.value = await groupApi.getGroupDependencies(requestParams.value.classroomId)
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
      v-model="requestParams.classroomId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
