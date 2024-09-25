<script setup lang="ts">
import { IconBriefcase, IconCalendarEvent, IconCloud, IconEdit, IconKey, IconSettings2, IconTrash, IconTrophy, IconUser, IconZoom } from '@tabler/icons-vue'

const { fieldOfStudies, studiesDegrees, studiesModes } = useData()

const studyPrograms = useStudyPrograms()
await studyPrograms.get()

const { currentItem, createDialog, deleteDialog, handleCreate, handleDelete, handleDialogOpen, handleUpdate, isSubmitting, search, updateDialog } = useCrud(studyPrograms.data)

watchEffect(() => {
  if (currentItem.value.semester)
    currentItem.value.year = Math.floor(currentItem.value.semester / 2) + 1
})
</script>

<template>
  <div class="flex w-full flex-wrap items-center justify-between gap-4 border border-b-gray-200 px-12 py-9">
    <div>
      <h1 class="text-2xl font-bold leading-9 text-gray-900">
        Plany studiów
      </h1>
      <ul class="list-inside list-disc text-base text-gray-700">
        <li>Plan studiów zawiera informacje o kierunku, trybie i stopniu studiów, roku i semestrze, w którym jest realizowany, oraz o dacie rozpoczęcia obowiązywania planu.</li>
        <li>Pod plany studiów należy podpinać plany zajęć.</li>
      </ul>
    </div>

    <div class="flex gap-4">
      <base-input v-model="search" placeholder="Szukaj" class="w-96" :icon="IconZoom" />
      <base-button class="h-12" variant="primary" @click="handleDialogOpen('create')">
        Dodaj kierunek
      </base-button>
    </div>
  </div>

  <base-table :search="search" :data="studyPrograms.data" :columns="studyPrograms.columns">
    <template #name="{ cell }">
      <span class="text-base font-medium text-gray-900">{{ cell.name }}</span>
      <br>
      <span class="text-sm text-gray-700">
        od {{ new Date(cell.startDate).toLocaleDateString('pl-PL') }}
        <br>
        {{ cell.faculty }}, {{ studiesDegrees.find((degree) => degree.type === cell.degreeOfStudy)?.value }}, {{ studiesModes.find((mode) => mode.type === cell.studyMode)?.value }}
      </span>
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

  <base-dialog v-model="updateDialog" title="Edytuj plan" :icon="IconUser">
    <form class="flex flex-col gap-4" @submit.prevent="handleUpdate(currentItem, async() => await studyPrograms.update(currentItem))">
      <base-input v-model="currentItem.id" :icon="IconKey" label="ID" disabled />
      <base-input v-model="currentItem.startDate" type="date" :icon="IconCalendarEvent" label="Data rozpoczęcia semestru" />
      <base-input v-model="currentItem.name" :icon="IconEdit" label="Nazwa" />
      <base-search v-model="currentItem.fieldOfStudy" :options="fieldOfStudies" :icon="IconSettings2" label="Kierunek">
        <template #options="{ option, active }">
          <span class="text-base font-medium" :class="{ 'text-gray-100': active, 'text-gray-900': !active }">{{ option.value }}</span>
          <br>
          <span class="text-base" :class="{ 'text-gray-50': active, 'text-gray-700': !active }">
            {{ option.department }}
          </span>
        </template>
      </base-search>
      <base-select v-model="currentItem.studyMode" :options="studiesModes" :icon="IconCloud" label="Tryb studiów" />
      <base-select v-model="currentItem.degreeOfStudy" :icon="IconTrophy" label="Stopień studiów" :options="studiesDegrees" />
      <base-input v-model="currentItem.year" type="number" :icon="IconCalendarEvent" label="Rok" disabled />
      <base-input v-model="currentItem.semester" type="number" :icon="IconBriefcase" label="Semestr" />

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
    <form class="flex flex-col gap-4" @submit.prevent="handleCreate(currentItem, async() => await studyPrograms.create(currentItem))">
      <base-input v-model="currentItem.id" :icon="IconKey" label="ID" disabled />
      <base-input v-model="currentItem.startDate" type="date" :icon="IconCalendarEvent" label="Data rozpoczęcia semestru" />
      <base-input v-model="currentItem.name" :icon="IconEdit" label="Nazwa" />
      <base-search v-model="currentItem.fieldOfStudy" :options="fieldOfStudies" :icon="IconSettings2" label="Kierunek">
        <template #options="{ option, active }">
          <span class="text-base font-medium" :class="{ 'text-gray-100': active, 'text-gray-900': !active }">{{ option.value }}</span>
          <br>
          <span class="text-base" :class="{ 'text-gray-50': active, 'text-gray-700': !active }">
            {{ option.department }}
          </span>
        </template>
      </base-search>
      <base-select v-model="currentItem.studyMode" :icon="IconCloud" label="Tryb studiów" :options="studiesModes" />
      <base-select v-model="currentItem.degreeOfStudy" :icon="IconTrophy" label="Stopień studiów" :options="studiesDegrees" />
      <base-input v-model="currentItem.year" type="number" :icon="IconCalendarEvent" label="Rok" disabled />
      <base-input v-model="currentItem.semester" type="number" :icon="IconBriefcase" label="Semestr" />

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
      <base-button variant="danger" :disabled="isSubmitting" :loading="isSubmitting" @click="handleDelete(currentItem, async() => await studyPrograms.delete(currentItem))">
        Usuń
      </base-button>
    </div>
  </base-dialog>
</template>
