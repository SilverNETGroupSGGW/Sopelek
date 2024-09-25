<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useUserApi } from '~/stores/api/useUserApi'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const userApi = useUserApi()
const endpoint = 'api/users/:userId'
const response = ref<ApiResponse<void> | null>(null)
const userId = ref<string>('')

async function handleExecute() {
  response.value = await userApi.deleteUser(userId.value)
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
      v-model="userId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
