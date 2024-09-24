<script setup lang="ts">
import { useScheduleApi } from '~/stores/api/useScheduleApi'
import type { ScheduleResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const bodyTemplate = {
  name: '',
  isDraft: false,
  studySemesterId: '',
}

const scheduleApi = useScheduleApi()
const response = ref<ApiResponse<ScheduleResult> | null>(null)
const scheduleJson = ref<string>(JSON.stringify(bodyTemplate, null, 2))

async function handleExecute() {
  try {
    const schedule = JSON.parse(scheduleJson.value)
    response.value = await scheduleApi.createSchedule(schedule)
  }
  catch (error) {
    // Notification todo
  }
}

async function handleClear() {
  response.value = null
}
</script>

<template>
  <api-view-common-template
    method="POST"
    endpoint="api/schedules"
    :response="response"
    @execute="handleExecute"
    @clear="handleClear"
  >
    <base-input
      v-model="scheduleJson"
      class="my-4 w-96"
      label="body"
      :multiline="true"
      :multiline-rows-height="5"
    />
  </api-view-common-template>
</template>
