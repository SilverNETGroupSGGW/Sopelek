<script setup lang="ts">
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import { useSubjectTypeApi } from '~/stores/api/useSubjectTypeApi'
import type { SubjectTypeResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const subjectTypeApi = useSubjectTypeApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/SubjectTypes'
const method = 'PUT'

const bodyTemplate = {
  id: '',
  name: '',
}

interface RequestParameters {
  body: string
}

const paramsDefault = {
  body: JSON.stringify(bodyTemplate, null, 2),
}

const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(endpoint, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(endpoint, requestParams.value)
})

const response = ref<ApiResponse<SubjectTypeResult> | null>(null)

async function handleExecute() {
  try {
    const subjectType: SubjectTypeResult = JSON.parse(requestParams.value.body)
    response.value = await subjectTypeApi.updateSubjectType(subjectType)
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
