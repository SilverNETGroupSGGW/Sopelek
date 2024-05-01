<script setup lang="ts">
import { IconEdit, IconKey, IconTrash, IconUser, IconZoom } from '@tabler/icons-vue'
import type { Tenant } from '~/types'

const account = useAccount()
await account.get()

if (!account.data?.roles.includes('SystemAdministrator'))
  navigateTo('/')

const tenants = useTenants()
await tenants.getAll()

const {
  currentItem,
  createDialog,
  deleteDialog,
  handleCreate,
  handleDelete,
  handleDialogOpen,
  handleUpdate,
  isSubmitting,
  search,
  updateDialog,
} = useCrud(tenants.data)

const isCreateExampleTenantDialogVisible = ref(false)
const exampleTenantName = ref<string>('')

async function onExampleTenantCreated() {
  isSubmitting.value = true
  await tenants.createExampleTenant(exampleTenantName.value)
  exampleTenantName.value = ''
  isCreateExampleTenantDialogVisible.value = false
  isSubmitting.value = false
}

const toasts = useToasts()

function onTenantSwitchClicked(tenant: Tenant) {
  tenants.switchTenant(tenant.id!)
  toasts.addToast({ type: 'success', message: `Aktywowano tenant: ${tenant.name}` })
}
</script>

<template>
  <div class="flex w-full flex-wrap items-center justify-between gap-4 border-b border-b-gray-200 px-12 py-9">
    <div>
      <h1 class="text-2xl font-bold leading-9 text-gray-900">
        Tenanty
      </h1>
    </div>

    <div class="flex gap-4">
      <base-input v-model="search" placeholder="Szukaj" class="w-96" :icon="IconZoom" />
      <base-button class="h-12" variant="primary" @click="handleDialogOpen('create')">
        Dodaj tenant
      </base-button>
      <base-button class="h-12" variant="primary" @click="isCreateExampleTenantDialogVisible = true">
        Dodaj tenant przykładowy
      </base-button>
    </div>
  </div>

  <base-table :data="tenants.data" :columns="tenants.columns" :search="search">
    <div class="mb-4 flex items-center">
      <input
        id="default-checkbox" type="checkbox" value=""
        class="size-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
      >
      <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default
        checkbox</label>
    </div>

    <template #name="{ cell }">
      <span class="text-base font-medium text-gray-900">{{ cell.name }}</span>
    </template>

    <template #actions="{ cell }">
      <div class="flex flex-wrap gap-4">
        <base-button
          variant="primary"
          @click="onTenantSwitchClicked(cell)"
        >
          Aktywuj
        </base-button>
        <base-button variant="secondary" @click="handleDialogOpen('update', cell.id!)">
          Edytuj
        </base-button>
        <base-button variant="danger" @click="handleDialogOpen('delete', cell.id!)">
          Usuń
        </base-button>
      </div>
    </template>
  </base-table>

  <base-dialog v-model="createDialog" title="Dodaj tenant" :icon="IconUser">
    <form
      class="flex flex-col gap-4"
      @submit.prevent="handleCreate(currentItem, async () => await tenants.create(currentItem))"
    >
      <base-input v-model="currentItem.name" :icon="IconUser" label="Nazwa" />
      <base-input v-model="currentItem.ownerId" :icon="IconUser" label="Id Właściciela Tenanta" />
      <base-input v-model="currentItem.organizationId" :icon="IconUser" label="Id Organizacji" />

      <div class="mt-6 flex justify-end gap-4">
        <base-button variant="secondary" type="button" @click="createDialog = false">
          Zamknij
        </base-button>
        <base-button variant="primary" type="submit" :disabled="isSubmitting" :loading="isSubmitting">
          Zapisz zmiany
        </base-button>
      </div>
    </form>
  </base-dialog>

  <base-dialog v-model="isCreateExampleTenantDialogVisible" title="Dodaj przykładowy tenant" :icon="IconUser">
    <form class="flex flex-col gap-4" @submit.prevent="onExampleTenantCreated()">
      <base-input v-model="exampleTenantName" :icon="IconUser" label="Nazwa" />

      <div class="mt-6 flex justify-end gap-4">
        <base-button variant="secondary" @click="isCreateExampleTenantDialogVisible = false">
          Zamknij
        </base-button>
        <base-button variant="primary" :disabled="isSubmitting" :loading="isSubmitting">
          Zapisz zmiany
        </base-button>
      </div>
    </form>
  </base-dialog>

  <base-dialog v-model="updateDialog" title="Edytuj tenant" :icon="IconEdit">
    <form
      class="flex flex-col gap-4"
      @submit.prevent="handleUpdate(currentItem, async () => await tenants.update(currentItem))"
    >
      <base-input v-model="currentItem.id" :icon="IconKey" label="ID" disabled />
      <base-input v-model="currentItem.name" :icon="IconUser" label="Nazwa" />
      <base-input v-model="currentItem.ownerId" :icon="IconUser" label="Id Właściciela Tenanta" />
      <base-input v-model="currentItem.organizationId" :icon="IconUser" label="Id Organizacji" />

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

  <base-dialog v-model="deleteDialog" title="Usuń tenant" :icon="IconTrash">
    <p class="text-base text-gray-700">
      Czy na pewno chcesz usunąć tenant?
    </p>

    <div class="mt-6 flex justify-end gap-4">
      <base-button variant="secondary" @click="deleteDialog = false">
        Zamknij
      </base-button>
      <base-button
        variant="danger" :disabled="isSubmitting" :loading="isSubmitting"
        @click="handleDelete(currentItem, async () => await tenants.delete(currentItem))"
      >
        Usuń
      </base-button>
    </div>
  </base-dialog>
</template>
