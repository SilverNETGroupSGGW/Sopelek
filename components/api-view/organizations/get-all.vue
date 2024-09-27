<script setup lang="ts">
import { useOrganizationApi } from '~/stores/api/useOrganizationsApi'
import type { OrganizationResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const organizationApi = useOrganizationApi()
const endpoint = 'api/Organizations'
const method = 'GET'
const response = ref<ApiResponse<OrganizationResult[]> | null>(null)

async function handleExecute() {
  response.value = await organizationApi.getOrganizations()
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
  />
</template>
