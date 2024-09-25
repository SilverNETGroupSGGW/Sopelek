<script setup lang="ts">
import { useScheduleApi } from '~/stores/api/useScheduleApi'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'
import type { StudyMode } from '~/types/apiResults/StudyMode'

const scheduleApi = useScheduleApi()
const studyModeResponse = ref<ApiResponse<StudyMode> | null>(null)
const endpoint = 'schedules/study-mode'

async function handleExecute() {
  studyModeResponse.value = await scheduleApi.getStudyModes()
}

async function handleClear() {
  studyModeResponse.value = null
}
</script>

<template>
  <api-view-common-template
    method="GET"
    :endpoint="endpoint"
    :response="studyModeResponse"
    @execute="handleExecute"
    @clear="handleClear"
  />
</template>
