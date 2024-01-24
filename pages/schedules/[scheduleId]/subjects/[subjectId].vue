<script setup lang="ts">
import { useRoute } from 'vue-router'
import { CalendarDaysIcon, MagnifyingGlassIcon, TrashIcon } from '@heroicons/vue/20/solid'
import { type Classroom, type Group, type Lecturer, type Lesson, type Schedule, type Subject, SubjectType } from '~/types'

// Types
interface DateTimeSequence {
  count: number
  dateTimes: string[]
}

// Nuxt hooks
const route = useRoute()
const router = useRouter()

// Data
const { daysOfWeek, lessonTypes } = useData()

const subjects = useSubjects()
await subjects.get(route.params.scheduleId as string)

const lecturers = useLecturers()
await lecturers.get()

const classrooms = useClassrooms()
await classrooms.get()

const groups = useGroups()
await groups.get(route.params.scheduleId as string)

const search = reactive({
  lecturers: '',
  classrooms: '',
  groups: '',
})

const data = ref<Subject | null>(null)

const shouldGenerateFifteenLessons = ref(false)

try {
  const subject = await $fetch<Subject>(`subjects/${route.params.subjectId}/extended`, {
    baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
    method: 'GET',
  })

  if (subject.lessons && subject.lessons.length > 0)
    shouldGenerateFifteenLessons.value = true

  subject.lessons ||= []
  subject.groupsIds = subject.groups?.map(group => group.id!)
  subject.lecturersIds = subject.lecturers?.map(lecturer => lecturer.id)

  data.value = subject
}
catch {
  data.value = {
    id: 'create',
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
  if (data.value!.classroom?.id !== classroom.id) {
    data.value!.classroom = classroom
    data.value!.classroomId = classroom.id
  }
}

function removeClassroom(classroom: Classroom) {
  if (data.value!.classroom?.id === classroom.id) {
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
const isSubmitting = ref(false)

async function saveChanges() {
  isSubmitting.value = true
  await subjects.update(data.value!)
  isSubmitting.value = false
  await subjects.get(route.params.scheduleId as string)
  router.push(`/schedules/${route.params.scheduleId}/subjects/list`)
}

async function generateFifteenLessons() {
  // Obtain schedule
  const schedule = await $fetch<Schedule>(`schedules/${route.params.scheduleId}`, {
    baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
    method: 'GET',
  })

  // Generate dates
  // We have to trim T part from schedule.startDate
  const dates = await $fetch<DateTimeSequence>(`LessonsDateTimeSequenceGeneration/${new Date(schedule.startDate).toLocaleDateString()}/${15}`, {
    baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
    method: 'GET',
  })

  data.value!.lessons = dates.dateTimes.map(dateTime => ({
    duration: data.value!.duration,
    startTime: dateTime,
  }) as Lesson)
}

watchEffect(() => {
  if (shouldGenerateFifteenLessons.value)
    generateFifteenLessons()
  else
    data.value!.lessons = undefined
})

// Dialog
const deleteDialog = ref(false)

async function handleDelete() {
  await subjects.delete(route.params.subjectId as string)
  deleteDialog.value = false
  router.push(`/schedules/${route.params.scheduleId}/subjects/list`)
}
</script>

<template>
  <form class="flex w-full flex-col px-12 py-9" @submit.prevent="saveChanges">
    <div class="flex w-full items-start justify-between">
      <div class="flex flex-col">
        <base-input v-model="data!.name" dense class="mb-1 text-xl font-semibold" placeholder="Nazwa przedmiotu" />

        <div class="mb-8 flex">
          <base-button v-for="(type, index) in lessonTypes" :key="index" type="button" :variant="data!.type === type.value ? 'primary' : 'secondary'" :class="index === 0 ? 'rounded-r-none' : index === lessonTypes.length - 1 ? 'rounded-l-none' : 'rounded-none'" @click="data!.type = type.value">
            {{ type.label }}
          </base-button>
        </div>
      </div>

      <div class="flex gap-4">
        <base-button v-if="data!.id !== 'create'" variant="danger" class="h-10" type="button" @click="deleteDialog = true">
          Usuń zajęcia
        </base-button>
        <base-button variant="primary" class="h-10" type="submit" :disabled="isSubmitting" :loading="isSubmitting">
          Zapisz zmiany
        </base-button>
      </div>
    </div>

    <div class="mb-6 rounded-lg border border-gray-200 p-4">
      <base-checkbox v-model="data!.isRemote" label="Zajęcia zdalne" />
    </div>

    <div class="mb-6 flex items-end gap-4 rounded-lg border border-gray-200 p-4">
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

    <div class="mb-6 rounded-lg border border-gray-200 p-4">
      <base-checkbox v-model="shouldGenerateFifteenLessons" label="Wygeneruj 15 zajęć" description="Skorzystaj z tej opcji, na przykład gdy dane zajęcia trwają dziewięć tygodni. Podana jest kolejno data zajęć i ich czas trwania." />

      <div v-if="shouldGenerateFifteenLessons" class="mt-4 flex w-fit flex-col gap-2">
        <div v-for="(date, index) in data!.lessons" :key="index" class="flex gap-2">
          <base-input v-model="data!.lessons![index].startTime" type="datetime-local" :icon="CalendarDaysIcon" />
          <base-button type="button" variant="danger" @click="data!.lessons!.splice(index, 1)">
            Usuń zajęcia
          </base-button>
        </div>

        <base-button type="button" variant="primary" @click="data!.lessons!.push({ duration: data!.startTime, startTime: '' })">
          Dodaj zajęcia
        </base-button>
      </div>
    </div>

    <div class="mb-6 flex flex-col rounded-lg border border-gray-200 p-4">
      <base-input v-model="search.lecturers" label="Prowadzący" placeholder="Szukaj" class="mb-4 w-96" :icon="MagnifyingGlassIcon" />

      <div class="rounded-lg border border-gray-200 p-4">
        <base-table :search="search.lecturers" :data="lecturers.data" :columns="lecturers.columns">
          <template #firstName="{ cell }">
            <span class="text-base font-medium text-gray-900">{{ cell.academicDegree }} {{ cell.firstName }} {{ cell.surname }}</span>
            <br>
            <a class="text-sm text-indigo-600 underline" :href="`mailto:${cell.email}`">{{ cell.email }}</a>
          </template>

          <template #actions="{ cell }">
            <button v-if="!data?.lecturers?.some(lecturer => lecturer.id === cell.id)" type="button" class="font-medium text-indigo-600" @click="addLecturer(cell)">
              Wybierz
            </button>
            <button v-else type="button" class="font-medium text-red-600" @click="removeLecturer(cell)">
              Usuń
            </button>
          </template>
        </base-table>
      </div>
    </div>

    <div class="mb-6 flex flex-col rounded-lg border border-gray-200 p-4">
      <label class="mb-1 font-medium text-gray-700">Grupy</label>
      <base-input v-model="search.groups" placeholder="Szukaj" class="mb-4 w-96" :icon="MagnifyingGlassIcon" />

      <div class="rounded-lg border border-gray-200 p-4">
        <base-table :search="search.groups" :data="groups.data" :columns="groups.columns">
          <template #name="{ cell }">
            <span class="text-base font-medium text-gray-900">{{ cell.name }}</span>
          </template>

          <template #capacity="{ cell }">
            <span class="text-base text-gray-900">{{ cell.capacity }}</span>
          </template>

          <template #actions="{ cell }">
            <button v-if="!data?.groups?.some(group => group.id === cell.id)" type="button" class="font-medium text-indigo-600" @click="addGroup(cell)">
              Wybierz
            </button>
            <button v-else type="button" class="font-medium text-red-600" @click="removeGroup(cell)">
              Usuń
            </button>
          </template>
        </base-table>
      </div>
    </div>

    <div class="mb-6 flex flex-col rounded-lg border border-gray-200 p-4">
      <label class="mb-1 font-medium text-gray-700">Sala</label>
      <base-input v-model="search.classrooms" placeholder="Szukaj" class="mb-4 w-96" :icon="MagnifyingGlassIcon" caption="Zajęcia mogą odbywać się tylko w jednej sali jednocześnie." />

      <div class="rounded-lg border border-gray-200 p-4">
        <base-table :search="search.classrooms" :data="classrooms.data" :columns="classrooms.columns">
          <template #name="{ cell }">
            <span class="text-base font-medium text-gray-900">{{ cell.name }}</span>
            <br>
            <span class="text-sm text-gray-700">budynek {{ cell.building }}, piętro {{ cell.floor }}</span>
          </template>

          <template #capacity="{ cell }">
            <span class="text-base text-gray-900">{{ cell.capacity }}</span>
          </template>

          <template #actions="{ cell }">
            <button v-if="data!.classroom?.id !== cell.id" type="button" class="font-medium text-indigo-600" @click="addClassroom(cell)">
              Wybierz
            </button>
            <button v-else type="button" class="font-medium text-red-600" @click="removeClassroom(cell)">
              Usuń
            </button>
          </template>
        </base-table>
      </div>
    </div>

    <base-input v-model="data!.comment" label="Komentarz" />
  </form>

  <base-dialog v-model="deleteDialog" title="Usuń zajęcia" :icon="TrashIcon">
    <p class="text-base text-gray-700">
      Czy na pewno chcesz usunąć zajęcia?
    </p>

    <div class="mt-6 flex justify-end gap-4">
      <base-button variant="secondary" @click="deleteDialog = false">
        Zamknij
      </base-button>
      <base-button variant="danger" @click="handleDelete">
        Usuń
      </base-button>
    </div>
  </base-dialog>
</template>
