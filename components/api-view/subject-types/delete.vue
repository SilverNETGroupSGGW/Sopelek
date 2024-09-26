<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useSubjectTypeApi } from '~/stores/api/useSubjectTypeApi'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const subjectTypeApi = useSubjectTypeApi()
const endpoint = 'api/SubjectTypes'
const method = 'DELETE'
const response = ref<ApiResponse<void> | null>(null)
const subjectTypeId = ref<string>('')

async function handleExecute() {
  response.value = await subjectTypeApi.deleteSubjectType(subjectTypeId.value)
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
      v-model="subjectTypeId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
