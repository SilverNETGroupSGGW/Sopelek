<script setup lang="ts">
import { useLecturerApi } from '~/stores/api/useLecturerApi'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'
import type { AcademicDegrees } from '~/types/apiResults/lecturers/AcademicDegrees'

const lecturerApi = useLecturerApi()
const endpoint = 'api/Lecturers/academic-degrees'
const method = 'GET'
const response = ref<ApiResponse<AcademicDegrees> | null>(null)

async function handleExecute() {
  response.value = await lecturerApi.getAcademicDegrees()
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
