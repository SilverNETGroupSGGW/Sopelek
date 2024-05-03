<script setup lang="ts">
import { IconCalendar, IconCompass, IconEdit, IconKey, IconPassword, IconTrash, IconUser, IconZoom } from '@tabler/icons-vue'
import type { CreateUser } from '~/types/User'

const account = useAccount()
await account.get()

if (!account.data?.roles.includes('TenantAdministrator'))
  navigateTo('/')

const users = useAppUsers()
await users.getAll()
users.fitlerUsersByTenant(account.data!.tenantId!)

const { handleDialogOpen, isSubmitting, search } = useCrud(users.data)

const userRolesDialog = useUserRolesDialog()
</script>

<template>
  <div class="flex w-full flex-wrap items-center justify-between gap-4 border-b border-b-gray-200 px-12 py-9">
    <div>
      <h1 class="text-2xl font-bold leading-9 text-gray-900">
        Użytkownicy
      </h1>
    </div>

    <div class="flex gap-4">
      <base-input v-model="search" placeholder="Szukaj" class="w-96" :icon="IconZoom" />
      <base-button class="h-12" variant="primary">
        Zaproś użytkownika
      </base-button>
    </div>
  </div>

  <base-table :data="users.data" :columns="users.columns" :search="search">
    <div id="test" class="mb-4 flex items-center">
      <input id="default-checkbox" type="checkbox" value="" class="size-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600">
      <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
    </div>

    <template #email="{ cell }">
      <span class="text-base font-medium text-gray-900">{{ cell.email }}</span>
    </template>

    <template #actions="{ cell }">
      <div class="flex flex-wrap gap-4">
        <base-button variant="danger" @click="handleDialogOpen('update', cell.id!)">
          Usuń z intytucji
        </base-button>
        <base-button variant="primary" @click="userRolesDialog.showDialog(cell.id)">
          Role
        </base-button>
      </div>
    </template>
  </base-table>

  <base-dialog v-model="userRolesDialog.isDialogVisible" title="Edytuj role" :icon="IconUser">
    <ul v-if="userRolesDialog.roles && userRolesDialog.roles.length !== 0">
      <li v-for="role in userRolesDialog.roles" :key="role.name">
        <div class="mt-6 flex justify-end gap-4">
          <span>{{ role.name }}</span>

          <base-button variant="primary" :disabled="role.isAssigned" :loading="isSubmitting" @click="userRolesDialog.assignRole(role.name)">
            Przypisz
          </base-button>
          <base-button variant="danger" :disabled="!role.isAssigned" :loading="isSubmitting" @click="userRolesDialog.unassignRole(role.name)">
            Usuń
          </base-button>
        </div>
      </li>
    </ul>

    <base-spinner v-else />

    <div class="mt-6 flex justify-end gap-4">
      <base-button variant="secondary" @click="userRolesDialog.clearState()">
        Zamknij
      </base-button>
    </div>
  </base-dialog>
</template>
