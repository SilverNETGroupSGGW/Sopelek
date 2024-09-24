<script setup lang="ts">
import { useScheduleApi } from '~/stores/api/useScheduleApi'
import type { ScheduleResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const scheduleApi = useScheduleApi()
const scheduleApiResponse = ref<ApiResponse<ScheduleResult[]> | null>(null)

async function handleExecute() {
  scheduleApiResponse.value = await scheduleApi.getSchedules()
}

async function handleClear() {
  scheduleApiResponse.value = null
}
</script>

<template>
  <api-view-common-template
    method="GET"
    endpoint="api/schedules"
    :response="scheduleApiResponse"
    @execute="handleExecute"
    @clear="handleClear"
  />
</template>
