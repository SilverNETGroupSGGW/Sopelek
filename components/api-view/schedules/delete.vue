<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useScheduleApi } from '~/stores/api/useScheduleApi'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const scheduleApi = useScheduleApi()
const endpoint = 'api/schedules'
const response = ref<ApiResponse<void> | null>(null)
const scheduleId = ref<string>('')

async function handleExecute() {
  response.value = await scheduleApi.deleteSchedule(scheduleId.value)
}

async function handleClear() {
  response.value = null
}
</script>

<template>
  <api-view-common-template
    method="DELETE"
    :endpoint="endpoint"
    :response="response"
    @execute="handleExecute"
    @clear="handleClear"
  >
    <base-input
      v-model="scheduleId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
