<script setup lang="ts">
import { IconCalendarEvent, IconEdit, IconKey, IconTrash, IconUser, IconZoom } from '@tabler/icons-vue'
import { DayOfWeek } from '~/types'

// Schedules
const schedules = useSchedule()
await schedules.get()

const { currentItem, createDialog, deleteDialog, handleCreate, handleDelete, handleDialogOpen, handleUpdate, isSubmitting, search, updateDialog } = useCrud(schedules.data)
</script>

<template>
  <div class="flex w-full flex-wrap items-center justify-between gap-4 border-b border-b-gray-200 px-12 py-9">
    <div>
      <h1 class="text-2xl font-bold leading-9 text-gray-900">
        Plany zajęć
      </h1>
    </div>

    <div class="flex gap-4">
      <base-input v-model="search" placeholder="Szukaj" class="w-96" :icon="IconZoom" />
      <base-button class="h-12" variant="primary" @click="handleDialogOpen('create')">
        Dodaj plan
      </base-button>
    </div>
  </div>

  <base-table :data="schedules.data" :columns="schedules.columns" :search="search">
    <div class="mb-4 flex items-center">
      <input id="default-checkbox" type="checkbox" value="" class="size-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600">
      <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
    </div>

    <template #name="{ cell }">
      <span class="text-base font-medium text-gray-900">{{ cell.name }}</span>
      <br>
      <span class="text-base text-gray-700">Start od {{ new Date(cell.year).toLocaleDateString('pl-PL') }}</span>
    </template>

    <template #actions="{ cell }">
      <div class="flex flex-wrap gap-4">
        <base-button variant="primary" :disabled="cell.isDownloading" :loading="cell.isDownloading" @click="schedules.download(cell)">
          Pobierz plan
        </base-button>
        <base-button variant="primary" :to="`/schedules/${cell.id}?day=${DayOfWeek.Monday}`">
          Kreator
        </base-button>

        <base-button variant="secondary" :to="`/schedules/${cell.id}/subjects/list`">
          Przedmioty
        </base-button>
        <base-button variant="secondary" :to="`/schedules/${cell.id}/groups`">
          Grupy
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

  <base-dialog v-model="updateDialog" title="Edytuj plan" :icon="IconUser">
    <form class="flex flex-col gap-4" @submit.prevent="handleUpdate(currentItem, async() => await schedules.update(currentItem))">
      <base-input v-model="currentItem.id" :icon="IconKey" label="ID" disabled />
      <base-input v-model="currentItem.name" :icon="IconEdit" label="Nazwa" />
      <base-input v-model="currentItem.year" type="number" :icon="IconCalendarEvent" label="Rok" disabled />

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

  <base-dialog v-model="createDialog" title="Utwórz plan" :icon="IconUser">
    <form class="flex flex-col gap-4" @submit.prevent="handleCreate(currentItem, async() => await schedules.create(currentItem))">
      <base-input v-model="currentItem.id" :icon="IconKey" label="ID" disabled />
      <base-input v-model="currentItem.name" :icon="IconEdit" label="Nazwa" />
      <base-input v-model="currentItem.year" type="number" :icon="IconCalendarEvent" label="Rok" disabled />

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

  <base-dialog v-model="deleteDialog" title="Usuń plan" :icon="IconTrash">
    <p class="text-base text-gray-700">
      Czy na pewno chcesz usunąć plan?
    </p>

    <div class="mt-6 flex justify-end gap-4">
      <base-button variant="secondary" @click="deleteDialog = false">
        Zamknij
      </base-button>
      <base-button variant="danger" :disabled="isSubmitting" :loading="isSubmitting" @click="handleDelete(currentItem, async() => await schedules.delete(currentItem))">
        Usuń
      </base-button>
    </div>
  </base-dialog>
</template>
