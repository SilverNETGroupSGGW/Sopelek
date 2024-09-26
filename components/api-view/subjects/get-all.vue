<script setup lang="ts">
import { useSubjectApi } from '~/stores/api/useSubjectApi'
import type { SubjectResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const subjectApi = useSubjectApi()
const endpoint = 'api/SubjectTypes'
const method = 'GET'
const response = ref<ApiResponse<SubjectResult[]> | null>(null)

async function handleExecute() {
  response.value = await subjectApi.getSubjects()
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
