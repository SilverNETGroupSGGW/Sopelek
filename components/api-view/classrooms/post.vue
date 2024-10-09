<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { useClassroomApi } from '~/stores/api/useClassroomApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { ClassroomResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const classroomApi = useClassroomApi()
const apiViewParameters = useApiViewRequestParameters()
const toast = useToast()

const endpoint = 'api/Classrooms'
const method = 'POST'

const bodyTemplate = {
  name: '',
  floor: '',
  building: '',
  capacity: 0,
  classroomTypeId: '',
}

interface RequestParameters {
  body: string
}

const paramsDefault = {
  body: JSON.stringify(bodyTemplate, null, 2),
}

const response = ref<ApiResponse<ClassroomResult> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(`${method} ${endpoint}`, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(`${method} ${endpoint}`, requestParams.value)
})

async function handleExecute() {
  try {
    const classroom: ClassroomResult = JSON.parse(requestParams.value.body)
    response.value = await classroomApi.createClassroom(classroom)
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
