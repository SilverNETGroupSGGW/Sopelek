<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useOffDaysApi } from '~/stores/api/useOffDayApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { OffDayResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const offDaysApi = useOffDaysApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = '/api/OffDay/:offDayId'
const method = 'GET'

interface RequestParameters {
  offDayId: string
}

const paramsDefault = {
  offDayId: '',
}

const response = ref<ApiResponse<OffDayResult> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(`${method} ${endpoint}`, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(`${method} ${endpoint}`, requestParams.value)
})

async function handleExecute() {
  response.value = await offDaysApi.getOffDay(requestParams.value.offDayId)
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
      v-model="requestParams.offDayId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
