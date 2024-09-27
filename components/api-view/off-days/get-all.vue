<script setup lang="ts">
import { useOffDaysApi } from '~/stores/api/useOffDayApi'
import type { OffDayResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const offDaysApi = useOffDaysApi()
const endpoint = 'api/OffDay'
const method = 'GET'
const response = ref<ApiResponse<OffDayResult[]> | null>(null)

async function handleExecute() {
  response.value = await offDaysApi.getOffDays()
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
