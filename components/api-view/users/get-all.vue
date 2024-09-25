<script setup lang="ts">
import { useUserApi } from '~/stores/api/useUserApi'
import type { UserResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const userApi = useUserApi()
const endpoint = 'api/Users'
const response = ref<ApiResponse<UserResult[]> | null>(null)

async function handleExecute() {
  response.value = await userApi.getUsers()
}

async function handleClear() {
  response.value = null
}
</script>

<template>
  <api-view-common-template
    method="GET"
    :endpoint="endpoint"
    :response="response"
    @execute="handleExecute"
    @clear="handleClear"
  />
</template>
