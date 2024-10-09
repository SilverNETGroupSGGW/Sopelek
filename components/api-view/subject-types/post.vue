<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { useSubjectTypeApi } from '~/stores/api/useSubjectTypeApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { SubjectTypeResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const subjectTypeApi = useSubjectTypeApi()
const apiViewParameters = useApiViewRequestParameters()
const toast = useToast()

const method = 'POST'
const endpoint = 'api/SubjectTypes'

const bodyTemplate = {
  name: '',
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

const response = ref<ApiResponse<SubjectTypeResult> | null>(null)

async function handleExecute() {
  try {
    const subjectType: SubjectTypeResult = JSON.parse(requestParams.value.body)
    response.value = await subjectTypeApi.createSubjectType(subjectType)
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
