<script setup lang="ts">
import { IconCalendarEvent, IconEdit, IconZoom } from '@tabler/icons-vue'
import { type BaseResponse, type Classroom, DayOfWeek, type Group, type Lecturer, type Subject, SubjectType } from '~/types'

// Props
const props = defineProps<{
  scheduleId: string
  subjectId: string
}>()

// Types
// interface DateTimeSequence {
//   count: number
//   dateTimes: string[]
// }

// Nuxt hooks
const runtimeConfig = useRuntimeConfig()
// const route = useRoute()

// Data
const { daysOfWeek, lessonTypes } = useData()

const scheduler = useScheduler()

const subjects = useSubjects()
if (!subjects.data.length)
  await subjects.get(props.scheduleId)

const lecturers = useLecturers()
if (!lecturers.data.length)
  await lecturers.get()

const classrooms = useClassrooms()
if (!classrooms.data.length)
  await classrooms.get()

const groups = useGroups()
if (!groups.data.length)
  await groups.get(props.scheduleId)

const search = reactive({
  lecturers: '',
  classrooms: '',
  groups: '',
})

const data = ref<Subject>({
  classroom: null,
  classroomId: null,
  dayOfWeek: DayOfWeek.Monday,
  duration: '00:05:00',
  groups: [],
  lecturers: [],
  lecturersIds: [],
  id: 'create',
  name: 'Zajęcia',
  scheduleId: props.scheduleId,
  startTime: '08:00:00',
  type: SubjectType.Unknown,
  lessons: [],
  groupsIds: [],
  isRemote: false,
  isConditional: false,
  comment: '',
})

try {
  const { data: subject } = await useFetch<BaseResponse<Subject>>(`subjects/${props.subjectId}/extended`, {
    baseURL: runtimeConfig.public.baseURL,
    method: 'GET',
  })

  if (subject.value)
    data.value = subject.value!.data
}
catch {
}

if (data.value) {
  data.value.lessons ||= []
  data.value.groupsIds = data.value.groups?.map(group => group.id!)
  data.value.lecturersIds = data.value.lecturers?.map(lecturer => lecturer.id)
}

function addLecturer(lecturer: Lecturer) {
  if (!data.value!.lecturersIds?.includes(lecturer.id)) {
    data.value!.lecturers!.push(lecturer)
    data.value!.lecturersIds!.push(lecturer.id)
  }
}

function removeLecturer(lecturer: Lecturer) {
  if (data.value!.lecturersIds?.includes(lecturer.id)) {
    data.value!.lecturers = data.value?.lecturers?.filter(l => l.id !== lecturer.id)
    data.value!.lecturersIds = data.value?.lecturersIds?.filter(id => id !== lecturer.id)
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
    data.value!.groups = data.value!.groups?.filter(g => g.id !== group.id)
    data.value!.groupsIds = data.value!.groupsIds?.filter(id => id !== group.id)
  }
}

// Time range
const timeRange: Array<{ value: string }> = []
const durationRange: Array<{ value: string }> = []
let initialDate = new Date(1970, 0, 1, 8, 0, 0, 0)

while (initialDate.getHours() <= 20) {
  timeRange.push({ value: new Date(initialDate).toLocaleTimeString() })
  initialDate.setMinutes(initialDate.getMinutes() + 5)
}

initialDate = new Date(1970, 0, 1, 0, 0, 0, 0)
while (initialDate.getHours() <= 4) {
  durationRange.push({ value: new Date(initialDate).toLocaleTimeString() })
  initialDate.setMinutes(initialDate.getMinutes() + 5)
}

// Dialog
const model = defineModel<boolean>()

// API
const isSubmitting = ref(false)

async function saveChanges() {
  isSubmitting.value = true

  try {
    await subjects.update(data.value!)
    await subjects.get(props.scheduleId)
    isSubmitting.value = false
    await scheduler.get(props.scheduleId)
    model.value = false
  }
  catch (error) {
    isSubmitting.value = false
    model.value = false
    return Promise.reject(error)
  }
}

// Obtain schedule
// const { data: schedule } = await useFetch<Schedule>(`schedules/${route.params.scheduleId}`, {
//   baseURL: runtimeConfig.public.baseURL,
//   method: 'GET',
// })

// Generate dates
// We have to trim T part from schedule.startDate
// if (schedule.value && data.value) {
//   if (data.value.lessons && data.value.lessons.length === 0) {
//     const { data: dates } = await useFetch<DateTimeSequence>(`LessonsDateTimeSequenceGeneration/${schedule.value.startDate}/${15}`, {
//       baseURL: runtimeConfig.public.baseURL,
//       method: 'GET',
//     })

//     if (dates.value) {
//       data.value!.lessons = dates.value.dateTimes.map(dateTime => ({
//         duration: data.value!.duration,
//         startTime: dateTime,
//       }) as Lesson)
//     }
//   }
// }
</script>

<template>
  <base-dialog v-model="model" :icon="IconEdit" title="Edytuj zajęcia" full-size right>
    <form @submit.prevent="saveChanges">
      <div class="flex w-full items-start justify-between">
        <div class="flex flex-col">
          <base-input v-model="data!.name" placeholder="Nazwa przedmiotu" class="mb-2" />

          <div class="mb-8 flex">
            <base-button v-for="(type, index) in lessonTypes" :key="index" type="button" :variant="data!.type === type.value ? 'primary' : 'secondary'" :class="index === 0 ? 'rounded-r-none' : index === lessonTypes.length - 1 ? 'rounded-l-none' : 'rounded-none'" @click="data!.type = type.value">
              {{ type.label }}
            </base-button>
          </div>
        </div>

        <div class="flex gap-4">
          <base-button variant="primary" class="h-10" type="submit" :disabled="isSubmitting" :loading="isSubmitting">
            Zapisz zmiany
          </base-button>
        </div>
      </div>

      <div class="mb-6 rounded-lg border border-gray-200 p-4">
        <base-checkbox v-model="data!.isRemote" label="Zajęcia zdalne" />
        <base-checkbox v-model="data!.isConditional" label="Zajęcia warunkowe" />
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

      <div class="mb-6 flex flex-col gap-y-2 rounded-lg border border-gray-200 p-4">
        <div v-for="(date, index) in data!.lessons" :key="index" class="flex gap-2">
          <base-input v-model="data!.lessons![index].startTime" type="datetime-local" :icon="IconCalendarEvent" />
          <base-button type="button" variant="danger" @click="data!.lessons!.splice(index, 1)">
            Usuń zajęcia
          </base-button>
        </div>

        <base-button type="button" variant="primary" class="w-max" @click="data!.lessons!.push({ duration: data!.startTime, startTime: '' })">
          Dodaj zajęcia
        </base-button>
      </div>

      <div class="mb-6 flex flex-col rounded-lg border border-gray-200">
        <div class="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-12 py-6">
          <p class="mb-1 text-xl font-semibold text-gray-900">
            Prowadzący
          </p>
          <base-input v-model="search.lecturers" placeholder="Szukaj" class="w-96" :icon="IconZoom" />
        </div>

        <base-table :search="search.lecturers" :data="lecturers.data" :columns="lecturers.columns" :paddingless="true">
          <template #firstName="{ cell }">
            <span class="text-base font-medium text-gray-900">{{ cell.academicDegree }} {{ cell.firstName }} {{ cell.surname }}</span>
            <br>
            <a class="text-sm text-indigo-600 underline" :href="`mailto:${cell.email}`">{{ cell.email }}</a>
          </template>

          <template #actions="{ cell }">
            <base-button v-if="!data?.lecturers?.some(lecturer => lecturer.id === cell.id)" type="button" variant="primary" @click="addLecturer(cell)">
              Wybierz
            </base-button>
            <base-button v-else type="button" variant="danger" @click="removeLecturer(cell)">
              Usuń
            </base-button>
          </template>
        </base-table>
      </div>

      <div class="mb-6 flex flex-col rounded-lg border border-gray-200">
        <div class="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-12 py-6">
          <p>
            <span class="mb-1 text-xl font-semibold text-gray-900">Grupy</span>
            <br>
            <small class="text-sm text-gray-700">W przypadku, gdy grupy zajęć nie są po kolei, należy utworzyć zajęcia dla każdej z nich oddzielnie.</small>
          </p>
          <base-input v-model="search.groups" placeholder="Szukaj" class="w-96" :icon="IconZoom" />
        </div>

        <base-table :search="search.groups" :data="groups.data" :columns="groups.columns" :paddingless="true">
          <template #name="{ cell }">
            <span class="text-base font-medium text-gray-900">{{ cell.name }}</span>
          </template>

          <template #capacity="{ cell }">
            <span class="text-base text-gray-900">{{ cell.capacity }}</span>
          </template>

          <template #actions="{ cell }">
            <base-button v-if="!data?.groups?.some(group => group.id === cell.id)" type="button" variant="primary" @click="addGroup(cell)">
              Wybierz
            </base-button>
            <base-button v-else type="button" variant="danger" @click="removeGroup(cell)">
              Usuń
            </base-button>
          </template>
        </base-table>
      </div>

      <div class="mb-6 flex flex-col rounded-lg border border-gray-200">
        <div class="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-12 py-6">
          <p>
            <span class="mb-1 text-xl font-semibold text-gray-900">Sala</span>
            <br>
            <small class="text-sm text-gray-700">Zajęcia mogą odbywać się tylko w jednej sali jednocześnie.</small>
          </p>
          <base-input v-model="search.classrooms" placeholder="Szukaj" class="w-96" :icon="IconZoom" />
        </div>

        <base-table :search="search.classrooms" :data="classrooms.data" :columns="classrooms.columns" :paddingless="true">
          <template #name="{ cell }">
            <span class="text-base font-medium text-gray-900">{{ cell.name }}</span>
            <br>
            <span class="text-sm text-gray-700">budynek {{ cell.building }}, piętro {{ cell.floor }}</span>
          </template>

          <template #capacity="{ cell }">
            <span class="text-base text-gray-900">{{ cell.capacity }}</span>
          </template>

          <template #actions="{ cell }">
            <base-button v-if="data!.classroom?.id !== cell.id" type="button" variant="primary" @click="addClassroom(cell)">
              Wybierz
            </base-button>
            <base-button v-else type="button" variant="danger" @click="removeClassroom(cell)">
              Usuń
            </base-button>
          </template>
        </base-table>
      </div>

      <base-input v-model="data!.comment" label="Komentarz" />
    </form>
  </base-dialog>
</template>
