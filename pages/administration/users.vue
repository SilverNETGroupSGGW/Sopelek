<script setup lang="ts">
import { IconCalendar, IconCompass, IconEdit, IconKey, IconPassword, IconTrash, IconUser, IconZoom } from '@tabler/icons-vue'
import type { CreateUser } from '~/types/User'

const account = useAccount()
await account.get()

if (!account.data?.roles.includes('SystemAdministrator'))
  navigateTo('/')

const users = useAppUsers()
await users.getAll()

const {
  currentItem,
  deleteDialog,
  handleDelete,
  handleDialogOpen,
  handleUpdate,
  isSubmitting,
  search,
  updateDialog,
} = useCrud(users.data)

const isUserCreateDialogVisible = ref(false)
const createUserModel = reactive<CreateUser>({ email: '', password: '' })

function onUserCreated() {
  isSubmitting.value = true
  users.create(createUserModel)
  createUserModel.email = ''
  createUserModel.password = ''
  isUserCreateDialogVisible.value = false
  isSubmitting.value = false
}

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
      <base-button class="h-12" variant="primary" @click="isUserCreateDialogVisible = true">
        Dodaj użytkownika
      </base-button>
    </div>
  </div>

  <base-table :data="users.data" :columns="users.columns" :search="search">
    <div id="test" class="mb-4 flex items-center">
      <input
        id="default-checkbox" type="checkbox" value=""
        class="size-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
      >
      <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default
        checkbox</label>
    </div>

    <template #email="{ cell }">
      <span class="text-base font-medium text-gray-900">{{ cell.email }}</span>
    </template>

    <template #actions="{ cell }">
      <div class="flex flex-wrap gap-4">
        <base-button variant="secondary" @click="handleDialogOpen('update', cell.id!)">
          Edytuj
        </base-button>
        <base-button variant="danger" @click="handleDialogOpen('delete', cell.id!)">
          Usuń
        </base-button>
        <base-button variant="primary" @click="userRolesDialog.showDialog(cell.id)">
          Role
        </base-button>
      </div>
    </template>
  </base-table>

  <base-dialog v-model="isUserCreateDialogVisible" title="Dodaj użytkownika" :icon="IconUser">
    <form class="flex flex-col gap-4" @submit.prevent="onUserCreated()">
      <base-input v-model="createUserModel.email" :icon="IconUser" label="Email" />
      <base-input v-model="createUserModel.password" :icon="IconPassword" label="Password" />

      <div class="mt-6 flex justify-end gap-4">
        <base-button variant="secondary" @click="isUserCreateDialogVisible = false">
          Zamknij
        </base-button>
        <base-button variant="primary" :disabled="isSubmitting" :loading="isSubmitting">
          Zapisz zmiany
        </base-button>
      </div>
    </form>
  </base-dialog>

  <base-dialog v-model="updateDialog" title="Edytuj użytkownika" :icon="IconEdit">
    <form
      class="flex flex-col gap-4"
      @submit.prevent="handleUpdate(currentItem, async () => await users.update(currentItem))"
    >
      <base-input v-model="currentItem.id" :icon="IconKey" label="ID" disabled />
      <base-input v-model="currentItem.email" :icon="IconUser" label="Email" />
      <base-input v-model="currentItem.createdAt" :icon="IconCalendar" label="Utworzono" disabled />
      <base-input v-model="currentItem.updatedAt" :icon="IconCalendar" label="Zaktualizowano" disabled />
      <base-input v-model="currentItem.lastActiveAt" :icon="IconCalendar" label="Ostatnio aktywny" disabled />
      <base-input v-model="currentItem.tenantId" :icon="IconCompass" label="Tenant ID" />

      <div class="mt-6 flex justify-end gap-4">
        <base-button variant="secondary" type="button" @click="updateDialog = false">
          Zamknij
        </base-button>
        <base-button variant="primary" type="submit" :disabled="isSubmitting" :loading="isSubmitting">
          Zapisz zmiany
        </base-button>
      </div>
    </form>
  </base-dialog>

  <base-dialog v-model="deleteDialog" title="Usuń użytkownika" :icon="IconTrash">
    <p class="text-base text-gray-700">
      Czy na pewno chcesz usunąć użytkownika?
    </p>

    <div class="mt-6 flex justify-end gap-4">
      <base-button variant="secondary" @click="deleteDialog = false">
        Zamknij
      </base-button>
      <base-button
        variant="danger" :disabled="isSubmitting" :loading="isSubmitting"
        @click="handleDelete(currentItem, async () => await users.delete(currentItem))"
      >
        Usuń
      </base-button>
    </div>
  </base-dialog>

  <base-dialog v-model="userRolesDialog.isDialogVisible" title="Edytuj role" :icon="IconUser">
    <ul v-if="userRolesDialog.roles && userRolesDialog.roles.length !== 0">
      <li v-for="role in userRolesDialog.roles" :key="role.name">
        <div class="mt-6 flex justify-end gap-4">
          {{ role.name }}

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
