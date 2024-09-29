<script setup lang="ts">
import { useClassroomTypesApi } from '~/stores/api/useClassroomTypesApi'
import type { ClassroomTypeResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const classroomTypesApi = useClassroomTypesApi()
const endpoint = 'api/ClassroomTypes'
const method = 'GET'
const response = ref<ApiResponse<ClassroomTypeResult[]> | null>(null)

async function handleExecute() {
  response.value = await classroomTypesApi.getClassroomTypes()
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
