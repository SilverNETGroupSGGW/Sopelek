<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useGroupApi } from '~/stores/api/useGroupApi'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const groupApi = useGroupApi()
const endpoint = 'api/Groups/:groupId'
const method = 'DELETE'
const response = ref<ApiResponse<void> | null>(null)
const groupId = ref<string>('')

async function handleExecute() {
  response.value = await groupApi.deleteGroup(groupId.value)
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
      v-model="groupId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
