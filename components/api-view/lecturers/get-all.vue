<script setup lang="ts">
import { useLecturerApi } from '~/stores/api/useLecturerApi'
import type { LecturerResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const lecturerApi = useLecturerApi()
const endpoint = 'api/Lecturers'
const method = 'GET'
const response = ref<ApiResponse<LecturerResult[]> | null>(null)

async function handleExecute() {
  response.value = await lecturerApi.getLecturers()
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
