<script setup lang="ts">
import { BuildingLibraryIcon, HomeIcon, KeyIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

const classrooms = useClassrooms()
await classrooms.get()

const { currentItem, createDialog, deleteDialog, handleCreate, handleDelete, handleDialogOpen, handleUpdate, search, updateDialog } = useCrud(classrooms.data)
</script>

<template>
  <div class="flex w-full flex-wrap items-center justify-between gap-4 border border-b-gray-200 px-12 py-9">
    <div>
      <h1 class="text-2xl font-bold leading-9 text-gray-900">
        Sale
      </h1>
    </div>

    <div class="flex gap-4">
      <base-input v-model="search" placeholder="Szukaj" class="w-96" :icon="MagnifyingGlassIcon" />
      <base-button class="h-12" variant="primary" @click="handleDialogOpen('create')">
        Dodaj sale
      </base-button>
    </div>
  </div>

  <base-table :search="search" :data="classrooms.data" :columns="classrooms.columns">
    <template #name="{ cell }">
      <span class="text-base font-medium text-gray-900">{{ cell.name }}</span>
    </template>

    <template #building="{ cell }">
      <span class="text-base font-medium text-gray-900">{{ cell.building }}</span>
    </template>

    <template #floor="{ cell }">
      <span class="text-base font-medium text-gray-900">{{ cell.floor }}</span>
    </template>

    <template #actions="{ cell }">
      <div class="flex gap-4">
        <button class="font-medium text-green-600" @click="handleDialogOpen('update', cell.id)">
          Edytuj
        </button>
        <button class="font-medium text-red-600" @click="handleDialogOpen('delete', cell.id)">
          Usuń
        </button>
      </div>
    </template>
  </base-table>

  <base-dialog v-model="createDialog" title="Dodaj sale" :icon="BuildingLibraryIcon">
    <form class="flex flex-col gap-4" @submit.prevent="handleCreate(currentItem, async () => await classrooms.create(currentItem))">
      <base-input v-model="currentItem.id" :icon="KeyIcon" label="ID" disabled />
      <base-input v-model="currentItem.name" :icon="PencilIcon" label="Nazwa" />
      <base-input v-model="currentItem.building" :icon="BuildingLibraryIcon" label="Budynek" />
      <base-input v-model="currentItem.floor" :icon="HomeIcon" label="Piętro" />

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

  <base-dialog v-model="updateDialog" title="Edytuj sale" :icon="BuildingLibraryIcon">
    <form class="flex flex-col gap-4" @submit.prevent="handleUpdate(currentItem, async() => await classrooms.update(currentItem))">
      <base-input v-model="currentItem.id" :icon="KeyIcon" label="ID" disabled />
      <base-input v-model="currentItem.name" :icon="PencilIcon" label="Nazwa" />
      <base-input v-model="currentItem.building" :icon="BuildingLibraryIcon" label="Budynek" />
      <base-input v-model="currentItem.floor" :icon="HomeIcon" label="Piętro" />

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

  <base-dialog v-model="deleteDialog" title="Usuń sale" :icon="TrashIcon">
    <p class="text-base text-gray-700">
      Czy na pewno chcesz usunąć sale?
    </p>

    <div class="mt-6 flex justify-end gap-4">
      <base-button variant="secondary" @click="deleteDialog = false">
        Zamknij
      </base-button>
      <base-button variant="danger" @click="handleDelete(currentItem, async() => await classrooms.delete(currentItem))">
        Usuń
      </base-button>
    </div>
  </base-dialog>
</template>
