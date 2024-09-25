<script setup lang="ts">
import { useScheduleApi } from '~/stores/api/useScheduleApi'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'
import type { DegreesOfStudies } from '~/types/apiResults/DegreesOfStudies'

const scheduleApi = useScheduleApi()
const degreesOfStudiesResponse = ref<ApiResponse<DegreesOfStudies> | null>(null)
const endpoint = 'schedules/degrees-of-studies'

async function handleExecute() {
  degreesOfStudiesResponse.value = await scheduleApi.getDegreesOfStudies()
}

async function handleClear() {
  degreesOfStudiesResponse.value = null
}
</script>

<template>
  <api-view-common-template
    method="GET"
    :endpoint="endpoint"
    :response="degreesOfStudiesResponse"
    @execute="handleExecute"
    @clear="handleClear"
  />
</template>
