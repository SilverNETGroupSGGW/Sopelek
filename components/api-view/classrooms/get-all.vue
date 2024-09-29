<script setup lang="ts">
import { useClassroomApi } from '~/stores/api/useClassroomApi'
import type { ClassroomResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const classroomApi = useClassroomApi()
const endpoint = 'api/Classrooms'
const method = 'GET'
const response = ref<ApiResponse<ClassroomResult[]> | null>(null)

async function handleExecute() {
  response.value = await classroomApi.getClassrooms()
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
