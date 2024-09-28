<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useLessonApi } from '~/stores/api/useLessonApi'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const lessonApi = useLessonApi()
const endpoint = '/api/Lessons/:lessonId'
const method = 'DELETE'
const response = ref<ApiResponse<void> | null>(null)
const lessonId = ref<string>('')

async function handleExecute() {
  response.value = await lessonApi.deleteLesson(lessonId.value)
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
      v-model="lessonId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
