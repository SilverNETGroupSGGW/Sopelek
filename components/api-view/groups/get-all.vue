<script setup lang="ts">
import { useGroupApi } from '~/stores/api/useGroupApi'
import type { GroupResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const groupApi = useGroupApi()
const endpoint = 'api/Groups'
const method = 'GET'
const response = ref<ApiResponse<GroupResult[]> | null>(null)

async function handleExecute() {
  response.value = await groupApi.getGroups()
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
  />
</template>
