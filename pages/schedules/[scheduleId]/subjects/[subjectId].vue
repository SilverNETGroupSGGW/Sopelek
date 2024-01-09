<script setup lang="ts">
import { useRoute } from 'vue-router'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { type Classroom, type Group, type Lecturer, type Subject, SubjectType } from '~/types'

// Nuxt hooks
const route = useRoute()
const router = useRouter()

// Data
const { daysOfWeek } = useData()

const lecturers = useLecturers()
await lecturers.get()

const classrooms = useClassrooms()
await classrooms.get()

const groups = useGroups()
await groups.get(route.params.scheduleId as string)

const search = ref('')

const data = ref<Subject | null>(null)

try {
  const subject = await $fetch<Subject>(`subjects/${route.params.subjectId}/extended`, {
    baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
    method: 'GET',
  })

  subject.groupsIds = subject.groups?.map(group => group.id!)
  subject.lecturersIds = subject.lecturers?.map(lecturer => lecturer.id)
  subject.classroomId = subject.classroom?.id

  data.value = subject
}
catch {
  data.value = {
    id: '',
    scheduleId: route.params.scheduleId as string,
    name: '',
    type: SubjectType.Unknown,
    startTime: '08:00:00',
    duration: '00:05:00',
    isRemote: false,
    lecturers: [],
    lecturersIds: [],
    classroom: {} as Classroom,
    classroomId: '',
    groups: [],
    groupsIds: [],
  }
}

function addLecturer(lecturer: Lecturer) {
  if (!data.value!.lecturersIds?.includes(lecturer.id)) {
    data.value!.lecturers!.push(lecturer)
    data.value!.lecturersIds!.push(lecturer.id)
  }
}

function removeLecturer(lecturer: Lecturer) {
  if (data.value!.lecturersIds?.includes(lecturer.id)) {
    data.value!.lecturers!.splice(data.value!.lecturers!.indexOf(lecturer), 1)
    data.value!.lecturersIds!.splice(data.value!.lecturersIds!.indexOf(lecturer.id), 1)
  }
}

function addClassroom(classroom: Classroom) {
  if (data.value!.classroom!.id !== classroom.id) {
    data.value!.classroom = classroom
    data.value!.classroomId = classroom.id
  }
}

function removeClassroom(classroom: Classroom) {
  if (data.value!.classroom!.id === classroom.id) {
    data.value!.classroom = undefined
    data.value!.classroomId = undefined
  }
}

function addGroup(group: Group) {
  if (!data.value!.groupsIds?.includes(group.id!)) {
    data.value!.groups!.push(group)
    data.value!.groupsIds!.push(group.id!)
  }
}

function removeGroup(group: Group) {
  if (data.value!.groupsIds?.includes(group.id!)) {
    data.value!.groups!.splice(data.value!.groups!.indexOf(group), 1)
    data.value!.groupsIds!.splice(data.value!.groupsIds!.indexOf(group.id!), 1)
  }
}

// Time range
const timeRange: Array<{ value: string }> = []
const durationRange: Array<{ value: string }> = []
let initialDate = new Date(2023, 0, 1, 8, 0, 0, 0)

while (initialDate.getHours() <= 20) {
  timeRange.push({ value: new Date(initialDate).toLocaleTimeString() })
  initialDate.setMinutes(initialDate.getMinutes() + 5)
}

initialDate = new Date(2023, 0, 1, 0, 0, 0, 0)
while (initialDate.getHours() <= 4) {
  durationRange.push({ value: new Date(initialDate).toLocaleTimeString() })
  initialDate.setMinutes(initialDate.getMinutes() + 5)
}

// API
async function saveChanges() {
  await $fetch<Subject[]>(`subjects`, {
    baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
    method: route.params.subjectId === 'create' ? 'POST' : 'PUT',
    body: JSON.stringify(data.value),
    headers: {
      Authorization: `Bearer ${useCookie('accessToken').value}`,
    },
  })

  const previousRoute = router.options.history.state.back?.toString()
  if (previousRoute?.startsWith('/schedules/'))
    router.push(previousRoute)
  else
    router.push(`/schedules/${route.params.scheduleId}/subjects/list`)
}
</script>

<template>
  <form class="flex w-full flex-col px-12 py-9" @submit.prevent="saveChanges">
    <div class="flex w-full items-start justify-between">
      <div class="flex flex-col">
        <base-input v-model="data!.name" dense class="mb-1 text-xl font-semibold" placeholder="Nazwa przedmiotu" />

        <div class="mb-8 flex">
          <base-button type="button" :variant="data!.type === SubjectType.Lecture ? 'primary' : 'secondary'" class="rounded-r-none" @click="data!.type = SubjectType.Lecture">
            Wykład
          </base-button>
          <base-button type="button" :variant="data!.type === SubjectType.PracticalClasses ? 'primary' : 'secondary'" class="rounded-none" @click="data!.type = SubjectType.PracticalClasses">
            Ćwiczenia
          </base-button>
          <base-button type="button" :variant="data!.type === SubjectType.Laboratories ? 'primary' : 'secondary'" class="rounded-none" @click="data!.type = SubjectType.Laboratories">
            Laboratoria
          </base-button>
          <base-button type="button" :variant="data!.type === SubjectType.Faculty ? 'primary' : 'secondary'" class="rounded-none" @click="data!.type = SubjectType.Faculty">
            Fakultet
          </base-button>
          <base-button type="button" :variant="data!.type === SubjectType.Unknown ? 'primary' : 'secondary'" class="rounded-l-none" @click="data!.type = SubjectType.Unknown">
            Inne
          </base-button>
        </div>
      </div>

      <div class="flex gap-4">
        <base-button variant="danger" class="h-10">
          Usuń zajęcia
        </base-button>
        <base-button variant="primary" class="h-10" type="submit">
          Zapisz zmiany
        </base-button>
      </div>
    </div>

    <div class="mb-6 flex items-end gap-4  rounded-lg border border-gray-200 p-4">
      <base-search v-model="data!.startTime" :options="timeRange" label="Domyślna godzina rozpoczęcia" />
      <base-search v-model="data!.duration" :options="durationRange" label="Czas trwania" />
    </div>

    <div class="mb-6 flex flex-col rounded-lg border border-gray-200 p-4">
      <label class="mb-1 font-medium text-gray-700">Domyślny dzień tygodnia</label>
      <div class="flex">
        <base-button v-for="(day, index) in daysOfWeek" :key="index" type="button" :variant="data!.dayOfWeek === day.value ? 'primary' : 'secondary'" :class="index === 0 ? 'rounded-r-none' : index === daysOfWeek.length - 1 ? 'rounded-l-none' : 'rounded-none'" @click="data!.dayOfWeek = day.value">
          {{ day.label }}
        </base-button>
      </div>
    </div>

    <div class="mb-6 flex flex-col rounded-lg border border-gray-200 p-4">
      <base-input v-model="search" label="Prowadzący" placeholder="Szukaj" class="mb-4 w-96" :icon="MagnifyingGlassIcon" />

      <div class="rounded-lg border border-gray-200 p-4">
        <base-table :search="search" :data="lecturers.data" :columns="lecturers.columns">
          <template #firstName="{ cell }">
            <span class="text-base font-medium text-gray-900">{{ cell.academicDegree }} {{ cell.firstName }} {{ cell.surname }}</span>
          </template>

          <template #email="{ cell }">
            <a class="text-base text-indigo-600 underline" :href="`mailto:${cell.email}`">{{ cell.email }}</a>
          </template>

          <template #actions="{ cell }">
            <button v-if="!data?.lecturers?.some(lecturer => lecturer.id === cell.id)" class="font-medium text-indigo-600" @click="addLecturer(cell)">
              Dodaj
            </button>
            <button v-else class="font-medium text-red-600" @click="removeLecturer(cell)">
              Usuń
            </button>
          </template>
        </base-table>
      </div>
    </div>

    <div class="mb-6 flex flex-col rounded-lg border border-gray-200 p-4">
      <label class="mb-1 font-medium text-gray-700">Grupy</label>
      <base-input v-model="search" placeholder="Szukaj" class="mb-4 w-96" :icon="MagnifyingGlassIcon" />

      <div class="rounded-lg border border-gray-200 p-4">
        <base-table :search="search" :data="groups.data" :columns="groups.columns">
          <template #name="{ cell }">
            <span class="text-base font-medium text-gray-900">{{ cell.name }}</span>
          </template>

          <template #actions="{ cell }">
            <button v-if="!data?.groups?.some(group => group.id === cell.id)" class="font-medium text-indigo-600" @click="addGroup(cell)">
              Dodaj
            </button>
            <button v-else class="font-medium text-red-600" @click="removeGroup(cell)">
              Usuń
            </button>
          </template>
        </base-table>
      </div>
    </div>

    <div class="mb-6 flex flex-col rounded-lg border border-gray-200 p-4">
      <label class="mb-1 font-medium text-gray-700">Sala</label>
      <base-input v-model="search" placeholder="Szukaj" class="mb-4 w-96" :icon="MagnifyingGlassIcon" caption="Zajęcia mogą odbywać się tylko w jednej sali jednocześnie." />

      <div class="rounded-lg border border-gray-200 p-4">
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
            <button v-if="data!.classroom!.id !== cell.id" class="font-medium text-indigo-600" @click="addClassroom(cell)">
              Dodaj
            </button>
            <button v-else class="font-medium text-red-600" @click="removeClassroom(cell)">
              Usuń
            </button>
          </template>
        </base-table>
      </div>
    </div>

    <base-input v-model="data!.comment" label="Komentarz" />
  </form>
</template>
