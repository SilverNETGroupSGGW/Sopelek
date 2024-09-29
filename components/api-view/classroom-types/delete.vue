<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useClassroomTypesApi } from '~/stores/api/useClassroomTypesApi'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const classroomTypesApi = useClassroomTypesApi()
const endpoint = 'api/ClassroomTypes/:id'
const method = 'DELETE'
const response = ref<ApiResponse<void> | null>(null)
const classroomTypeId = ref<string>('')

async function handleExecute() {
  response.value = await classroomTypesApi.deleteClassroomType(classroomTypeId.value)
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
      v-model="classroomTypeId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
