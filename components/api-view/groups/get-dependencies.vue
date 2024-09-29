<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useGroupApi } from '~/stores/api/useGroupApi'
import { useApiViewRequestParameters } from '~/stores/api-view/useApiViewRequestParameters'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'
import type { GroupConflictResult } from '~/types/apiResults/groups/GroupConflictResult'

const groupApi = useGroupApi()
const apiViewParameters = useApiViewRequestParameters()
const endpoint = 'api/Groups/:groupId/dependencies'
const method = 'GET'

interface RequestParameters {
  groupId: string
}

const paramsDefault = {
  groupId: '',
}

const response = ref<ApiResponse<GroupConflictResult> | null>(null)
const requestParams = ref<RequestParameters>(
  apiViewParameters.getIfExistsOrDefault(`${method} ${endpoint}`, paramsDefault),
)

watch(requestParams.value, () => {
  apiViewParameters.storeParam(`${method} ${endpoint}`, requestParams.value)
})

async function handleExecute() {
  response.value = await groupApi.getGroup(requestParams.value.groupId)
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
      v-model="requestParams.groupId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
