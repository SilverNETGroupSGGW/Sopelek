<script setup lang="ts">
import { IconCalendarEvent, IconTrash, IconZoom } from '@tabler/icons-vue'
import type { Subject } from '~/types'

// Nuxt hooks
const route = useRoute()

// Composables
const { daysOfWeek } = useData()

// Subjects
const subjects = useSubjects()
await subjects.get(route.params.scheduleId as string)

const { currentItem, deleteDialog, handleDelete, handleDialogOpen, isSubmitting, search } = useCrud(subjects.data)

// Filter
const days = ref('')

function filter(row: Subject) {
  const searchFilter = search.value === '' || Object.values(row).some(value =>
    (value as string)?.toString().toLowerCase().includes(search.value.toLowerCase()),
  )

  const daysFilter = days.value === '' || row.dayOfWeek === daysOfWeek.find(x => x.label === days.value)?.value

  return searchFilter && daysFilter
}

// Edit
const dialog = ref(false)
const editedSubjectId = ref('')

function handleLessonEdit(id: string) {
  editedSubjectId.value = id
  dialog.value = true
}
</script>

<template>
  <div class="flex w-full flex-wrap items-center justify-between gap-4 border border-b-gray-200 px-12 py-9">
    <div>
      <h1 class="text-2xl font-bold leading-9 text-gray-900">
        Przedmioty
      </h1>
      <p class="text-base font-normal leading-normal text-gray-700">
        Puste zajęcia nie będą wyświetlane w planie.
      </p>
    </div>

    <div class="flex gap-4">
      <base-input v-model="search" placeholder="Szukaj" class="w-64" :icon="IconZoom" />
      <base-select v-model="days" :options="daysOfWeek.map(x => ({ value: x.label }))" placeholder="Dzień tygodnia" class="w-64" :icon="IconCalendarEvent" />

      <base-button variant="primary" @click="handleLessonEdit('create')">
        Dodaj przedmiot
      </base-button>
      <base-button variant="secondary" :to="`/schedules/${route.params.scheduleId}`">
        Wróć do kreatora
      </base-button>
    </div>
  </div>

  <base-table :data="subjects.data" :columns="subjects.columns" :search="search" :filter="filter">
    <template #name="{ cell }">
      <span class="text-base font-semibold text-gray-900">{{ cell.name }}</span>

      <div class="text-sm text-indigo-600">
        <span v-if="cell.isConditional">zajęcia warunkowe,</span>
        <span>{{ cell.isRemote ? 'zdalnie' : 'stacjonarnie' }}</span>
      </div>

      <div class="text-sm text-gray-700">
        <span>{{ daysOfWeek.find(x => x.value === cell.dayOfWeek)?.label }}</span>

        <span v-if="cell.startTime">, {{ cell.startTime.slice(0, -3) }}</span>
        <span v-if="cell.duration"> ({{ cell.duration.slice(0, -3) }}h)</span>
      </div>

      <div v-if="cell.classroom" class="text-sm text-gray-700">
        <span>Sala: {{ cell.classroom!.name }}, budynek {{ cell.classroom!.building }}, piętro {{ cell.classroom!.floor }}</span>
      </div>

      <div v-if="cell.groups && cell.groups.length > 0" class="text-sm text-gray-700">
        <span>Grupa: {{ cell.groups!.map(x => x.name).join(", ") }}</span>
      </div>
    </template>

    <template #lecturers="{ cell }">
      <div class="flex flex-wrap gap-2">
        <span v-for="lecturer in cell.lecturers" :key="lecturer.id" class="font-medium text-gray-700">
          {{ lecturer.academicDegree }} {{ lecturer.firstName }} {{ lecturer.surname }}
        </span>
      </div>
    </template>

    <template #actions="{ cell }">
      <div class="flex gap-4">
        <base-button variant="primary" @click="handleLessonEdit(cell.id!)">
          Edytuj
        </base-button>
        <base-button variant="danger" @click="handleDialogOpen('delete', cell.id!)">
          Usuń
        </base-button>
      </div>
    </template>
  </base-table>

  <base-dialog v-model="deleteDialog" title="Usuń zajęcia" :icon="IconTrash">
    <p class="text-base text-gray-700">
      Czy na pewno chcesz usunąć zajęcia?
    </p>

    <div class="mt-6 flex justify-end gap-4">
      <base-button variant="secondary" @click="deleteDialog = false">
        Zamknij
      </base-button>
      <base-button variant="danger" :disabled="isSubmitting" :loading="isSubmitting" @click="handleDelete(currentItem, async() => await subjects.delete(currentItem.id))">
        Usuń
      </base-button>
    </div>
  </base-dialog>

  <subject-dialog v-if="editedSubjectId" :key="editedSubjectId" v-model="dialog" :schedule-id="($route.params.scheduleId as string)" :subject-id="editedSubjectId" />
</template>
