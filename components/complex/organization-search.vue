<script lang="ts" setup>
import { IconUser } from '@tabler/icons-vue'
import { useOrganizationSearch } from '~/stores/complex/useOrganizationSearch'
import type { OrganizationResult } from '~/types/apiResults'

const props = defineProps<{
  organizationId?: string | null
  onOrganizationSelected?: (organization: OrganizationResult) => void
}>()

const organizationSearch = useOrganizationSearch()
await organizationSearch.getOrganizationsBySearchPhrase('')

const organization = organizationSearch.organizations.find(o => o.id === props.organizationId)

function handleOrganizationFilter(organization: OrganizationResult, query: string): boolean {
  return organization.name.toLowerCase().startsWith(query.toLowerCase())
}

function handleOrganizationSelected(organization: OrganizationResult) {
  if (props.onOrganizationSelected) {
    props.onOrganizationSelected(organization)
  }
}
</script>

<template>
  <base-search
    :current-item="organization"
    caption="Wpisz email, aby wyszukać użytkownika"
    :options="organizationSearch.organizations"
    :icon="IconUser"
    @item-filtered="handleOrganizationFilter"
    @item-rendered="o => `${o.name}`"
    @item-selected="handleOrganizationSelected"
  />
</template>
