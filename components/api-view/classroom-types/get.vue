<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useClassroomTypesApi } from '~/stores/api/useClassroomTypesApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { ClassroomTypeResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const classroomTypesApi = useClassroomTypesApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/ClassroomTypes'
const method = 'GET'

interface RequestParameters {
  classroomTypeId: string
}

const paramsDefault = {
  classroomTypeId: '',
}

const response = ref<ApiResponse<ClassroomTypeResult> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(`${method} ${endpoint}`, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(`${method} ${endpoint}`, requestParams.value)
})

async function handleExecute() {
  response.value = await classroomTypesApi.getClassroomType(requestParams.value.classroomTypeId)
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
      v-model="requestParams.classroomTypeId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
