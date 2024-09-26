<script setup lang="ts">
import { useTenantApi } from '~/stores/api/useTenantApi'
import type { TenantResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const tenantsApi = useTenantApi()
const endpoint = 'api/Tenants'
const response = ref<ApiResponse<TenantResult[]> | null>(null)

async function handleExecute() {
  response.value = await tenantsApi.getTenants()
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
