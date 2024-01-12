<script setup lang="ts">
import { KeyIcon, MagnifyingGlassIcon, PencilIcon, PlusIcon, TrashIcon, UserGroupIcon } from '@heroicons/vue/20/solid'

// Nuxt hooks
const route = useRoute()

// Groups
const groups = useGroups()
await groups.get(route.params.scheduleId as string)

const { currentItem, createDialog, deleteDialog, handleCreate, handleDelete, handleDialogOpen, handleUpdate, search, updateDialog } = useCrud(groups.data)

watchEffect(() => currentItem.value.scheduleId = route.params.scheduleId as string)
</script>

<template>
  <div class="flex w-full flex-wrap items-center justify-between gap-4 border border-b-gray-200 px-12 py-9">
    <div>
      <h1 class="text-2xl font-bold leading-9 text-gray-900">
        Grupy
      </h1>
    </div>

    <div class="flex gap-4">
      <base-input v-model="search" placeholder="Szukaj" class="w-96" :icon="MagnifyingGlassIcon" />
      <base-button variant="primary" @click="handleDialogOpen('create')">
        Dodaj grupę
      </base-button>
      <base-button to="/schedules" variant="secondary">
        Wróć do planów
      </base-button>
    </div>
  </div>

  <base-table :data="groups.data" :columns="groups.columns" :search="search">
    <template #name="{ cell }">
      <span class="text-base font-medium text-gray-900">{{ cell.name }}</span>
    </template>

    <template #capacity="{ cell }">
      <span class="text-base text-gray-900">{{ cell.capacity }}</span>
    </template>

    <template #actions="{ cell }">
      <div class="flex gap-4">
        <base-button variant="primary" @click="handleDialogOpen('update', cell.id!)">
          Edytuj
        </base-button>
        <base-button variant="danger" @click="handleDialogOpen('delete', cell.id!)">
          Usuń
        </base-button>
      </div>
    </template>
  </base-table>

  <base-dialog v-model="createDialog" title="Dodaj grupę" :icon="UserGroupIcon">
    <form class="flex flex-col gap-4" @submit.prevent="handleCreate(currentItem, async () => await groups.create(currentItem))">
      <base-input v-model="currentItem.id" :icon="KeyIcon" label="ID" disabled />
      <base-input v-model="currentItem.scheduleId" :icon="KeyIcon" label="ID planu" disabled />
      <base-input v-model="currentItem.name" :icon="PencilIcon" label="Nazwa" />
      <base-input v-model="currentItem.capacity" :icon="PlusIcon" label="Pojemność" type="number" min="0" />

      <div class="mt-6 flex justify-end gap-4">
        <base-button variant="secondary" @click="createDialog = false">
          Zamknij
        </base-button>
        <base-button variant="primary" type="submit">
          Zapisz zmiany
        </base-button>
      </div>
    </form>
  </base-dialog>

  <base-dialog v-model="updateDialog" title="Edytuj grupę" :icon="UserGroupIcon">
    <form class="flex flex-col gap-4" @submit.prevent="handleUpdate(currentItem, async () => await groups.update(currentItem))">
      <base-input v-model="currentItem.id" :icon="KeyIcon" label="ID" disabled />
      <base-input v-model="currentItem.scheduleId" :icon="KeyIcon" label="ID planu" disabled />
      <base-input v-model="currentItem.name" :icon="PencilIcon" label="Nazwa" />
      <base-input v-model="currentItem.capacity" :icon="PlusIcon" label="Pojemność" type="number" min="0" />

      <div class="mt-6 flex justify-end gap-4">
        <base-button variant="secondary" @click="updateDialog = false">
          Zamknij
        </base-button>
        <base-button variant="primary" type="submit">
          Zapisz zmiany
        </base-button>
      </div>
    </form>
  </base-dialog>

  <base-dialog v-model="deleteDialog" title="Usuń grupę" :icon="TrashIcon">
    <p class="text-base text-gray-700">
      Czy na pewno chcesz usunąć grupę?
    </p>

    <div class="mt-6 flex justify-end gap-4">
      <base-button variant="secondary" @click="deleteDialog = false">
        Zamknij
      </base-button>
      <base-button variant="danger" @click="handleDelete(currentItem, async () => await groups.delete(currentItem))">
        Usuń
      </base-button>
    </div>
  </base-dialog>
</template>
