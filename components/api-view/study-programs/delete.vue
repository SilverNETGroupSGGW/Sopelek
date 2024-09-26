<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useStudyProgramApi } from '~/stores/api/useStudyProgramApi'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const studyProgramApi = useStudyProgramApi()
const endpoint = 'api/StudyProgram/:studyProramId'
const method = 'DELETE'
const response = ref<ApiResponse<void> | null>(null)
const studyProgramId = ref<string>('')

async function handleExecute() {
  response.value = await studyProgramApi.deleteStudyProgram(studyProgramId.value)
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
      v-model="studyProgramId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
