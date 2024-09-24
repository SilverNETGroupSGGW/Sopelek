<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useScheduleApi } from '~/stores/api/useScheduleApi'
import type { ScheduleResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const scheduleApi = useScheduleApi()
const response = ref<ApiResponse<ScheduleResult> | null>(null)
const scheduleId = ref<string>('')

async function handleExecute() {
  response.value = await scheduleApi.getSchedule(scheduleId.value)
}

async function handleClear() {
  response.value = null
}
</script>

<template>
  <api-view-common-template
    method="GET"
    endpoint="api/schedules/:id"
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
