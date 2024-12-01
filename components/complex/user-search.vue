<script lang="ts" setup>
import { IconUser } from '@tabler/icons-vue'
import { useUserSearch } from '~/stores/complex/useUserSearch'
import type { UserResult } from '~/types/apiResults'

const props = defineProps<{
  userId?: string | null
  onUserSelected?: (user: UserResult) => void
}>()

const userSearch = useUserSearch()
await userSearch.getUsersBySearchPhrase('')

const user = userSearch.users.find(user => user.id === props.userId)

function handleUserFilter(user: UserResult, query: string): boolean {
  return user.email.toLowerCase().startsWith(query.toLowerCase())
}

function handleUserSelected(user: UserResult) {
  if (props.onUserSelected) {
    props.onUserSelected(user)
  }
}
</script>

<template>
  <base-search
    :current-item="user"
    caption="Wpisz email, aby wyszukać użytkownika"
    :options="userSearch.users"
    :icon="IconUser"
    @item-filtered="handleUserFilter"
    @item-rendered="user => `${user.email}`"
    @item-selected="handleUserSelected"
  />
</template>
