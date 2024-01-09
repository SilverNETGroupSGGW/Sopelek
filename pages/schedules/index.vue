<script setup lang="ts">
import { ViewfinderCircleIcon } from '@heroicons/vue/20/solid'
import { BriefcaseIcon, CalendarIcon, CloudIcon, KeyIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon, TrophyIcon, UserIcon } from '@heroicons/vue/24/outline'

// Data
const { courses, studiesDegrees, studiesModes } = useData()

// Schedules
const schedules = useSchedule()
await schedules.get()

const { currentItem, createDialog, deleteDialog, handleCreate, handleDelete, handleDialogOpen, handleUpdate, search, updateDialog } = useCrud(schedules.data)

watchEffect(() => {
  const course = courses.find(course => course.value.includes(currentItem.value.fieldOfStudy))
  if (course)
    currentItem.value.faculty = course.department
})
</script>

<template>
  <div class="flex w-full flex-wrap items-center justify-between gap-4 border-b border-b-gray-200 px-12 py-9">
    <div>
      <h1 class="text-2xl font-bold leading-9 text-gray-900">
        Plany zajęć
      </h1>
    </div>

    <div class="flex gap-4">
      <base-input v-model="search" placeholder="Szukaj" class="w-96" :icon="MagnifyingGlassIcon" />
      <base-button class="h-12" variant="primary" @click="handleDialogOpen('create')">
        Dodaj plan
      </base-button>
    </div>
  </div>

  <base-table :data="schedules.data" :columns="schedules.columns" :search="search">
    <template #name="{ cell }">
      <span class="text-base font-medium text-gray-900">{{ cell.name }}</span>
    </template>

    <template #info="{ cell }">
      <span class="text-base font-medium text-gray-900">
        {{ cell.fieldOfStudy }} {{ cell.studyMode }} {{ cell.degreeOfStudy }}
      </span>
      <br>
      <span class="text-base text-gray-700">rok {{ cell.year }}, semestr {{ cell.semester }}</span>
    </template>

    <template #actions="{ cell }">
      <div class="flex flex-wrap gap-4">
        <base-button variant="primary" @click="schedules.download(cell)">
          Pobierz plan
        </base-button>
        <base-button variant="primary" :to="`/schedules/${cell.id}`">
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

  <base-dialog v-model="updateDialog" title="Edytuj plan" :icon="UserIcon">
    <form class="flex flex-col gap-4" @submit.prevent="handleUpdate(currentItem, async() => await schedules.update(currentItem))">
      <base-input v-model="currentItem.id" :icon="KeyIcon" label="ID" disabled />
      <base-input v-model="currentItem.name" :icon="PencilIcon" label="Nazwa" />
      <base-search v-model="currentItem.fieldOfStudy" :options="courses" :icon="ViewfinderCircleIcon" label="Kierunek">
        <template #options="{ option, active }">
          <span class="text-base font-medium" :class="{ 'text-gray-100': active, 'text-gray-900': !active }">{{ option.value }}</span>
          <br>
          <span class="text-base" :class="{ 'text-gray-50': active, 'text-gray-700': !active }">
            {{ option.department }}
          </span>
        </template>
      </base-search>
      <base-input v-model="currentItem.studyMode" :icon="CloudIcon" label="Tryb studiów" />
      <base-select v-model="currentItem.degreeOfStudy" :icon="TrophyIcon" label="Stopień studiów" :options="studiesDegrees">
        <template #options="{ option, active }">
          <span class="text-base" :class="{ 'text-gray-100': active, 'text-gray-900': !active }">{{ option.type }}</span>
        </template>
      </base-select>
      <base-input v-model="currentItem.year" type="number" :icon="CalendarIcon" label="Rok" />
      <base-input v-model="currentItem.semester" type="number" :icon="BriefcaseIcon" label="Semestr" />

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

  <base-dialog v-model="createDialog" title="Utwórz plan" :icon="UserIcon">
    <form class="flex flex-col gap-4" @submit.prevent="handleCreate(currentItem, async() => await schedules.create(currentItem))">
      <base-input v-model="currentItem.id" :icon="KeyIcon" label="ID" disabled />
      <base-input v-model="currentItem.startDate" type="date" :icon="CalendarIcon" label="Data rozpoczęcia" />
      <base-input v-model="currentItem.name" :icon="PencilIcon" label="Nazwa" />
      <base-search v-model="currentItem.fieldOfStudy" :options="courses" :icon="ViewfinderCircleIcon" label="Kierunek">
        <template #options="{ option, active }">
          <span class="text-base font-medium" :class="{ 'text-gray-100': active, 'text-gray-900': !active }">{{ option.value }}</span>
          <br>
          <span class="text-base" :class="{ 'text-gray-50': active, 'text-gray-700': !active }">
            {{ option.department }}
          </span>
        </template>
      </base-search>
      <base-select v-model="currentItem.studyMode" :icon="CloudIcon" label="Tryb studiów" :options="studiesModes" />
      <base-select v-model="currentItem.degreeOfStudy" :icon="TrophyIcon" label="Stopień studiów" :options="studiesDegrees" />
      <base-input v-model="currentItem.year" type="number" :icon="CalendarIcon" label="Rok" />
      <base-input v-model="currentItem.semester" type="number" :icon="BriefcaseIcon" label="Semestr" />

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

  <base-dialog v-model="deleteDialog" title="Usuń plan" :icon="TrashIcon">
    <p class="text-base text-gray-700">
      Czy na pewno chcesz usunąć plan?
    </p>

    <div class="mt-6 flex justify-end gap-4">
      <base-button variant="secondary" @click="deleteDialog = false">
        Zamknij
      </base-button>
      <base-button variant="danger" @click="handleDelete(currentItem, async() => await schedules.delete(currentItem))">
        Usuń
      </base-button>
    </div>
  </base-dialog>
</template>
