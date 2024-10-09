<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { useUserApi } from '~/stores/api/useUserApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { UserResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const bodyTemplate = {
  id: '',
  userName: '',
  email: '',
  language: '',
}

const userApi = useUserApi()
const apiViewParameters = useApiViewRequestParameters()
const toast = useToast()
const endpoint = 'api/users'

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

const response = ref<ApiResponse<UserResult> | null>(null)

async function handleExecute() {
  try {
    const user = JSON.parse(requestParams.value.body)
    response.value = await userApi.updateUser(user)
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
    method="PUT"
    :endpoint="endpoint"
    :response="response"
    @execute="handleExecute"
    @clear="handleClear"
  >
    <base-input
      v-model="requestParams.body"
      class="my-4 w-full"
      label="body"
      :multiline="true"
      :multiline-rows-height="8"
    />
  </api-view-common-template>
</template>
