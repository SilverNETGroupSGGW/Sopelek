<script setup lang="ts">
import { IconKey } from '@tabler/icons-vue'
import { useOrganizationApi } from '~/stores/api/useOrganizationsApi'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const organizationApi = useOrganizationApi()
const endpoint = 'api/Organizations/:organizationId'
const method = 'DELETE'
const response = ref<ApiResponse<void> | null>(null)
const organizationId = ref<string>('')

async function handleExecute() {
  response.value = await organizationApi.deleteOrganization(organizationId.value)
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
      v-model="organizationId"
      class="my-4 w-72"
      label="Id"
      :icon="IconKey"
    />
  </api-view-common-template>
</template>
