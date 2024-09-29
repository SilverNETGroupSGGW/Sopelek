<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useGroupApi } from '~/stores/api/useGroupApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { GroupResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const groupApi = useGroupApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/Groups/schedule/:scheduleId'
const method = 'GET'

interface RequestParameters {
  scheduleId: string
}

const paramsDefault = {
  scheduleId: '',
}

const response = ref<ApiResponse<GroupResult[]> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(`${method} ${endpoint}`, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(`${method} ${endpoint}`, requestParams.value)
})

async function handleExecute() {
  response.value = await groupApi.getGroupsForSchedule(requestParams.value.scheduleId)
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
      v-model="requestParams.scheduleId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
