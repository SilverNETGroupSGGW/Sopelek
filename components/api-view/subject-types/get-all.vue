<script setup lang="ts">
import { useSubjectTypeApi } from '~/stores/api/useSubjectTypeApi'
import type { SubjectTypeResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const subjectTypeApi = useSubjectTypeApi()
const endpoint = 'api/SubjectTypes'
const method = 'GET'
const response = ref<ApiResponse<SubjectTypeResult[]> | null>(null)

async function handleExecute() {
  response.value = await subjectTypeApi.getSubjectTypes()
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
