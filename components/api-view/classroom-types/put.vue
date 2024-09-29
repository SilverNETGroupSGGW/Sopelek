<script setup lang="ts">
import { useClassroomTypesApi } from '~/stores/api/useClassroomTypesApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { ClassroomTypeResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const classroomTypesApi = useClassroomTypesApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/ClassroomTypes/:id'
const method = 'PUT'

const bodyTemplate = {
  id: '',
  name: '',
  isPrimitiveType: false,
  organizationId: '',
}

interface RequestParameters {
  body: string
}

const paramsDefault = {
  body: JSON.stringify(bodyTemplate, null, 2),
}

const response = ref<ApiResponse<ClassroomTypeResult> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(`${method} ${endpoint}`, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(`${method} ${endpoint}`, requestParams.value)
})

async function handleExecute() {
  try {
    const classroomType: ClassroomTypeResult = JSON.parse(requestParams.value.body)
    response.value = await classroomTypesApi.updateClassroomType(classroomType)
  }
  catch (error) {
    // Notification todo
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
