<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useClassroomApi } from '~/stores/api/useClassroomApi'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const classroomApi = useClassroomApi()
const endpoint = 'api/Classrooms/:classroomId'
const method = 'DELETE'
const response = ref<ApiResponse<void> | null>(null)
const classroomId = ref<string>('')

async function handleExecute() {
  response.value = await classroomApi.deleteClassroom(classroomId.value)
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
  >
    <base-input
      v-model="classroomId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
