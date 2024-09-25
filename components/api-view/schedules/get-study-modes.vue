<script setup lang="ts">
import { useScheduleApi } from '~/stores/api/useScheduleApi'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'
import type { StudyMode } from '~/types/apiResults/StudyMode'

const scheduleApi = useScheduleApi()
const endpoint = 'schedules/study-mode'
const response = ref<ApiResponse<StudyMode> | null>(null)

async function handleExecute() {
  response.value = await scheduleApi.getStudyModes()
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
