<script setup lang="ts">
import { useStudyProgramApi } from '~/stores/api/useStudyProgramApi'
import type { StudyProgramResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const studyProgramApi = useStudyProgramApi()
const endpoint = 'api/StudyProgram/all'
const method = 'GET'
const response = ref<ApiResponse<StudyProgramResult[]> | null>(null)

async function handleExecute() {
  response.value = await studyProgramApi.getStudyPrograms()
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
