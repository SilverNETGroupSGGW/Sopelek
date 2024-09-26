<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useTenantApi } from '~/stores/api/useTenantApi'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const tenantsApi = useTenantApi()
const endpoint = 'api/Tenants/:tenantId'
const method = 'DELETE'
const response = ref<ApiResponse<void> | null>(null)
const tenantId = ref<string>('')

async function handleExecute() {
  response.value = await tenantsApi.deleteTenant(tenantId.value)
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
      v-model="tenantId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
