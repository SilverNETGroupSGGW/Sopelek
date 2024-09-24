<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useScheduleApi } from '~/stores/api/useScheduleApi'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const scheduleApi = useScheduleApi()
const scheduleApiResponse = ref<ApiResponse<void> | null>(null)
const scheduleId = ref<string>('')

async function handleExecute() {
  scheduleApiResponse.value = await scheduleApi.deleteSchedule(scheduleId.value)
}

async function handleClear() {
  scheduleApiResponse.value = null
}
</script>

<template>
  <api-view-common-template
    method="DELETE"
    endpoint="api/schedules"
    :response="scheduleApiResponse"
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
