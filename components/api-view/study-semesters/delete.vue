<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useStudySemesterApi } from '~/stores/api/useStudySemesterApi'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const studySemesterApi = useStudySemesterApi()
const endpoint = 'api/StudySemesters/:id'
const method = 'DELETE'
const response = ref<ApiResponse<void> | null>(null)
const studySemesterId = ref<string>('')

async function handleExecute() {
  response.value = await studySemesterApi.deleteStudySemester(studySemesterId.value)
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
      v-model="studySemesterId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
