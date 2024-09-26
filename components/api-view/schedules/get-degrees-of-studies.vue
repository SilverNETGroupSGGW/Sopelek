<script setup lang="ts">
import { useScheduleApi } from '~/stores/api/useScheduleApi'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'
import type { DegreesOfStudies } from '~/types/apiResults/schedule/DegreesOfStudies'

const scheduleApi = useScheduleApi()
const endpoint = 'schedules/degrees-of-studies'
const response = ref<ApiResponse<DegreesOfStudies> | null>(null)

async function handleExecute() {
  response.value = await scheduleApi.getDegreesOfStudies()
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
