<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useOffDaysApi } from '~/stores/api/useOffDayApi'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const offDaysApi = useOffDaysApi()
const endpoint = 'api/OffDay/:offDayId'
const method = 'DELETE'
const response = ref<ApiResponse<void> | null>(null)
const offDayId = ref<string>('')

async function handleExecute() {
  response.value = await offDaysApi.deleteOffDay(offDayId.value)
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
      v-model="offDayId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
