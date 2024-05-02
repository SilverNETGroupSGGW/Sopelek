<script setup lang="ts">
import { IconBaseline, IconEdit, IconKey, IconTrash, IconUser, IconZoom } from '@tabler/icons-vue'

const account = useAccount()
await account.get()

if (!account.data?.roles.includes('TenantAdministrator'))
  navigateTo('/')

const classroomTypes = useClassroomTypes()
await classroomTypes.get()

const { currentItem, createDialog, deleteDialog, handleCreate, handleDelete, handleDialogOpen, handleUpdate, isSubmitting, search, updateDialog } = useCrud(classroomTypes.data)
</script>

<template>
  <div class="flex w-full flex-wrap items-center justify-between gap-4 border-b border-b-gray-200 px-12 py-9">
    <div>
      <h1 class="text-2xl font-bold leading-9 text-gray-900">
        Typy zajęć
      </h1>
    </div>

    <div class="flex gap-4">
      <base-input v-model="search" placeholder="Szukaj" class="w-96" :icon="IconZoom" />
      <base-button class="h-12" variant="primary" @click="handleDialogOpen('create')">
        Dodaj typ zajęć
      </base-button>
    </div>
  </div>

  <base-table :data="classroomTypes.data" :columns="classroomTypes.columns" :search="search">
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

    <template #isPrimitiveType="{ cell }">
      <base-checkbox v-model="cell.isPrimitiveType" label="" :disabled="true" />
    </template>

    <template #actions="{ cell }">
      <div class="flex flex-wrap gap-4">
        <base-button variant="secondary" @click="handleDialogOpen('update', cell.id!)">
          Edytuj
        </base-button>
        <base-button v-if="!cell.isPrimitiveType" variant="danger" @click="handleDialogOpen('delete', cell.id!)">
          Usuń
        </base-button>
      </div>
    </template>
  </base-table>

  <base-dialog v-model="createDialog" title="Dodaj typ przedmiotu" :icon="IconUser">
    <form
      class="flex flex-col gap-4"
      @submit.prevent="handleCreate(currentItem, async () => await classroomTypes.create(currentItem))"
    >
      <base-input v-model="currentItem.name" :icon="IconUser" label="Nazwa" />

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

  <base-dialog v-model="updateDialog" title="Edytuj typ przedmiotu" :icon="IconEdit">
    <form
      class="flex flex-col gap-4"
      @submit.prevent="handleUpdate(currentItem, async () => await classroomTypes.update(currentItem))"
    >
      <base-input v-model="currentItem.id" :icon="IconKey" label="ID" disabled />
      <base-input v-model="currentItem.name" :icon="IconUser" label="Nazwa" />
      <base-input v-if="currentItem.isPrimitiveType" model-value="Tak" :icon="IconBaseline" label="Czy typ prymitywny" disabled />
      <base-input v-if="!currentItem.isPrimitiveType" model-value="Nie" :icon="IconBaseline" label="Czy typ prymitywny" disabled />

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

  <base-dialog v-model="deleteDialog" title="Usuń typ przedmiotu" :icon="IconTrash">
    <p class="text-base text-gray-700">
      Czy na pewno chcesz usunąć typ przedmiotu?
    </p>

    <div class="mt-6 flex justify-end gap-4">
      <base-button variant="secondary" @click="deleteDialog = false">
        Zamknij
      </base-button>
      <base-button
        variant="danger" :disabled="isSubmitting" :loading="isSubmitting"
        @click="handleDelete(currentItem, async () => await classroomTypes.delete(currentItem))"
      >
        Usuń
      </base-button>
    </div>
  </base-dialog>
</template>
