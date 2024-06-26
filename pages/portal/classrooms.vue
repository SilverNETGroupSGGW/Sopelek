<script setup lang="ts">
import { IconBuilding, IconEdit, IconKey, IconNumber, IconPlus, IconTrash, IconZoom } from '@tabler/icons-vue'

const classrooms = useClassrooms()
await classrooms.get()

const { currentItem, createDialog, deleteDialog, handleCreate, handleDelete, handleDialogOpen, handleUpdate, isSubmitting, search, updateDialog } = useCrud(classrooms.data)
</script>

<template>
  <div class="flex w-full flex-wrap items-center justify-between gap-4 border border-b-gray-200 px-12 py-9">
    <div>
      <h1 class="text-2xl font-bold leading-9 text-gray-900">
        Sale
      </h1>
    </div>

    <div class="flex gap-4">
      <base-input v-model="search" placeholder="Szukaj" class="w-96" :icon="IconZoom" />
      <base-button class="h-12" variant="primary" @click="handleDialogOpen('create')">
        Dodaj salę
      </base-button>
    </div>
  </div>

  <base-table :search="search" :data="classrooms.data" :columns="classrooms.columns">
    <template #name="{ cell }">
      <span class="text-base font-medium text-gray-900">{{ cell.name }}</span>
      <br>
      <span class="text-sm text-gray-700">budynek {{ cell.building }}, piętro {{ cell.floor }}</span>
    </template>

    <template #capacity="{ cell }">
      <span class="text-base text-gray-900">{{ cell.capacity }}</span>
    </template>

    <template #actions="{ cell }">
      <div class="flex gap-4">
        <base-button variant="primary" @click="handleDialogOpen('update', cell.id)">
          Edytuj
        </base-button>
        <base-button variant="danger" @click="handleDialogOpen('delete', cell.id)">
          Usuń
        </base-button>
      </div>
    </template>
  </base-table>

  <base-dialog v-model="createDialog" title="Dodaj salę" :icon="IconBuilding">
    <form class="flex flex-col gap-4" @submit.prevent="handleCreate(currentItem, async () => await classrooms.create(currentItem))">
      <base-input v-model="currentItem.id" :icon="IconKey" label="ID" disabled />
      <base-input v-model="currentItem.name" :icon="IconEdit" label="Nazwa" />
      <base-input v-model="currentItem.building" :icon="IconBuilding" label="Budynek" />
      <base-input v-model="currentItem.floor" :icon="IconNumber" label="Piętro" />
      <base-input v-model="currentItem.capacity" :icon="IconPlus" label="Pojemność" type="number" min="0" />

      <div class="mt-6 flex justify-end gap-4">
        <base-button variant="secondary" @click="createDialog = false">
          Zamknij
        </base-button>
        <base-button variant="primary" type="submit" :disabled="isSubmitting" :loading="isSubmitting">
          Zapisz zmiany
        </base-button>
      </div>
    </form>
  </base-dialog>

  <base-dialog v-model="updateDialog" title="Edytuj salę" :icon="IconBuilding">
    <form class="flex flex-col gap-4" @submit.prevent="handleUpdate(currentItem, async() => await classrooms.update(currentItem))">
      <base-input v-model="currentItem.id" :icon="IconKey" label="ID" disabled />
      <base-input v-model="currentItem.name" :icon="IconEdit" label="Nazwa" />
      <base-input v-model="currentItem.building" :icon="IconBuilding" label="Budynek" />
      <base-input v-model="currentItem.floor" :icon="IconNumber" label="Piętro" />
      <base-input v-model="currentItem.capacity" :icon="IconPlus" label="Pojemność" type="number" min="0" />

      <div class="mt-6 flex justify-end gap-4">
        <base-button variant="secondary" @click="updateDialog = false">
          Zamknij
        </base-button>
        <base-button variant="primary" type="submit" :disabled="isSubmitting" :loading="isSubmitting">
          Zapisz zmiany
        </base-button>
      </div>
    </form>
  </base-dialog>

  <base-dialog v-model="deleteDialog" title="Usuń salę" :icon="IconTrash">
    <p class="text-base text-gray-700">
      Czy na pewno chcesz usunąć salę?
    </p>

    <div class="mt-6 flex justify-end gap-4">
      <base-button variant="secondary" @click="deleteDialog = false">
        Zamknij
      </base-button>
      <base-button variant="danger" :disabled="isSubmitting" :loading="isSubmitting" @click="handleDelete(currentItem, async() => await classrooms.delete(currentItem))">
        Usuń
      </base-button>
    </div>
  </base-dialog>
</template>
