<script setup lang="ts">
import { useScheduleApi } from '~/stores/api/useScheduleApi'
import type { ScheduleResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const scheduleApi = useScheduleApi()
const endpoint = 'api/schedules'
const response = ref<ApiResponse<ScheduleResult[]> | null>(null)

async function handleExecute() {
  response.value = await scheduleApi.getSchedules()
}

async function handleClear() {
  response.value = null
}
</script>

<template>
  <api-view-common-template
    method="GET"
    :endpoint="endpoint"
    :response="response"
    @execute="handleExecute"
    @clear="handleClear"
  />
</template>
