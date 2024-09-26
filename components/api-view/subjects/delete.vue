<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useSubjectApi } from '~/stores/api/useSubjectApi'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const subjectApi = useSubjectApi()
const endpoint = 'api/Subjects/:subjectId'
const method = 'DELETE'
const response = ref<ApiResponse<void> | null>(null)
const subjectId = ref<string>('')

async function handleExecute() {
  response.value = await subjectApi.deleteSubject(subjectId.value)
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
      v-model="subjectId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
