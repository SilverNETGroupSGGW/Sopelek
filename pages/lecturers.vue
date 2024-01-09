<script setup lang="ts">
import { InboxIcon, KeyIcon, MagnifyingGlassIcon, TrashIcon, TrophyIcon, UserIcon } from '@heroicons/vue/24/outline'

// Data
const { degrees } = useData()

// Lecturers
const lecturers = useLecturers()
await lecturers.get()

const { currentItem, createDialog, deleteDialog, handleCreate, handleDelete, handleDialogOpen, handleUpdate, search, updateDialog } = useCrud(lecturers.data)
</script>

<template>
  <div class="flex w-full flex-wrap justify-between gap-4 border-b border-b-gray-200 px-12 py-9">
    <div>
      <h1 class="text-2xl font-bold leading-9 text-gray-900">
        Wykładowcy<br>
      </h1>
      <p class="text-base font-normal leading-normal text-gray-700">
        Dane pochodzą z
        <span class="text-base font-semibold leading-normal text-indigo-600">Bazy Wiedzy SGGW</span>
      </p>
    </div>

    <div class="flex gap-4">
      <base-input v-model="search" placeholder="Szukaj" class="w-96" :icon="MagnifyingGlassIcon" />
      <base-button class="h-12" variant="primary" @click="handleDialogOpen('create')">
        Dodaj wykładowcę
      </base-button>
    </div>
  </div>

  <base-table :data="lecturers.data" :columns="lecturers.columns" :search="search">
    <template #firstName="{ cell }">
      <span class="text-base font-medium text-gray-900">{{ cell.academicDegree }} {{ cell.firstName }} {{ cell.surname }}</span>
    </template>

    <template #email="{ cell }">
      <a class="text-base text-indigo-600 underline" :href="`mailto:${cell.email}`">{{ cell.email }}</a>
    </template>

    <template #actions="{ cell }">
      <div class="flex gap-4">
        <button class="font-medium text-green-600" @click="handleDialogOpen('update', cell.id!)">
          Edytuj
        </button>
        <button class="font-medium text-red-600" @click="handleDialogOpen('delete', cell.id!)">
          Usuń
        </button>
      </div>
    </template>
  </base-table>

  <base-dialog v-model="createDialog" title="Dodaj wykładowcę" :icon="UserIcon">
    <form class="flex flex-col gap-4" @submit.prevent="handleCreate(currentItem, async() => await lecturers.create(currentItem))">
      <base-input v-model="currentItem.id" :icon="KeyIcon" label="ID" disabled />
      <base-select v-model="currentItem.academicDegree" :options="degrees" :icon="TrophyIcon" label="Stopień naukowy" />
      <base-input v-model="currentItem.firstName" :icon="UserIcon" label="Imię" />
      <base-input v-model="currentItem.surname" :icon="UserIcon" label="Nazwisko" />
      <base-input v-model="currentItem.email" :icon="InboxIcon" label="E-mail" />

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

  <base-dialog v-model="updateDialog" title="Edytuj wykładowcę" :icon="UserIcon">
    <form class="flex flex-col gap-4" @submit.prevent="handleUpdate(currentItem, async() => await lecturers.update(currentItem))">
      <base-input v-model="currentItem.id" :icon="KeyIcon" label="ID" disabled />
      <base-select v-model="currentItem.academicDegree" :options="degrees" :icon="TrophyIcon" label="Stopień naukowy" />
      <base-input v-model="currentItem.firstName" :icon="UserIcon" label="Imię" />
      <base-input v-model="currentItem.surname" :icon="UserIcon" label="Nazwisko" />
      <base-input v-model="currentItem.email" :icon="InboxIcon" label="E-mail" />

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

  <base-dialog v-model="deleteDialog" title="Usuń wykładowcę" :icon="TrashIcon">
    <p class="text-base text-gray-700">
      Czy na pewno chcesz usunąć wykładowcę?
    </p>

    <div class="mt-6 flex justify-end gap-4">
      <base-button variant="secondary" @click="deleteDialog = false">
        Zamknij
      </base-button>
      <base-button variant="danger" @click="handleDelete(currentItem, async() => await lecturers.delete(currentItem))">
        Usuń
      </base-button>
    </div>
  </base-dialog>
</template>
