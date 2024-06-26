<script setup lang="ts">
import { IconInbox, IconKey, IconTrash, IconTrophy, IconUser, IconZoom } from '@tabler/icons-vue'

// Data
const { degrees } = useData()

// Lecturers
const lecturers = useLecturers()
await lecturers.get()

const { currentItem, createDialog, deleteDialog, handleCreate, handleDelete, handleDialogOpen, handleUpdate, isSubmitting, search, updateDialog } = useCrud(lecturers.data)

watchEffect(() => {
  if (currentItem.value.firstName && currentItem.value.surname)
    currentItem.value.email = `${currentItem.value.firstName}_${currentItem.value.surname}@sggw.edu.pl`.toLowerCase()
})
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
      <base-input v-model="search" placeholder="Szukaj" class="w-96" :icon="IconZoom" />
      <base-button class="h-12" variant="primary" @click="handleDialogOpen('create')">
        Dodaj wykładowcę
      </base-button>
    </div>
  </div>

  <base-table :data="lecturers.data" :columns="lecturers.columns" :search="search">
    <template #firstName="{ cell }">
      <span class="text-base font-medium text-gray-900">{{ cell.academicDegree }} {{ cell.firstName }} {{ cell.surname }}</span>
      <br>
      <a class="text-sm text-indigo-600 underline" :href="`mailto:${cell.email}`">{{ cell.email }}</a>
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

  <base-dialog v-model="createDialog" title="Dodaj wykładowcę" :icon="IconUser">
    <form class="flex flex-col gap-4" @submit.prevent="handleCreate(currentItem, async() => await lecturers.create(currentItem))">
      <base-input v-model="currentItem.id" :icon="IconKey" label="ID" disabled />
      <base-select v-model="currentItem.academicDegree" :options="degrees" :icon="IconTrophy" label="Stopień naukowy" />
      <base-input v-model="currentItem.firstName" :icon="IconUser" label="Imię" />
      <base-input v-model="currentItem.surname" :icon="IconUser" label="Nazwisko" />
      <base-input v-model="currentItem.email" :icon="IconInbox" label="E-mail" />

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

  <base-dialog v-model="updateDialog" title="Edytuj wykładowcę" :icon="IconUser">
    <form class="flex flex-col gap-4" @submit.prevent="handleUpdate(currentItem, async() => await lecturers.update(currentItem))">
      <base-input v-model="currentItem.id" :icon="IconKey" label="ID" disabled />
      <base-select v-model="currentItem.academicDegree" :options="degrees" :icon="IconTrophy" label="Stopień naukowy" />
      <base-input v-model="currentItem.firstName" :icon="IconUser" label="Imię" />
      <base-input v-model="currentItem.surname" :icon="IconUser" label="Nazwisko" />
      <base-input v-model="currentItem.email" :icon="IconInbox" label="E-mail" />

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

  <base-dialog v-model="deleteDialog" title="Usuń wykładowcę" :icon="IconTrash">
    <p class="text-base text-gray-700">
      Czy na pewno chcesz usunąć wykładowcę?
    </p>

    <div class="mt-6 flex justify-end gap-4">
      <base-button variant="secondary" @click="deleteDialog = false">
        Zamknij
      </base-button>
      <base-button variant="danger" :disabled="isSubmitting" :loading="isSubmitting" @click="handleDelete(currentItem, async() => await lecturers.delete(currentItem))">
        Usuń
      </base-button>
    </div>
  </base-dialog>
</template>
