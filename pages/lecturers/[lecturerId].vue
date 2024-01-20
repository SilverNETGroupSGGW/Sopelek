<script setup lang="ts">
import { Tab, TabGroup, TabList } from '@headlessui/vue'
import { DayOfWeek, type Lecturer } from '~/types'

// Nuxt hooks
const route = useRoute()
const router = useRouter()
router.push({
  query: {
    day: route.query.day ?? DayOfWeek.Monday,
  },
})

// Data
const { daysOfWeek } = useData()

// Utils
const { calculatePosition } = useSubject()

// Time range
const timeRange: Date[] = []
const smallerTimeRange: Date[] = []
let initialDate = new Date(2023, 0, 1, 8, 0, 0, 0)

while (initialDate.getHours() < 20 || (initialDate.getHours() === 20 && initialDate.getMinutes() === 0)) {
  // timeRange is in 30 minute interval
  timeRange.push(new Date(initialDate.getTime()))
  initialDate.setMinutes(initialDate.getMinutes() + 30)
}

initialDate = new Date(2023, 0, 1, 8, 0, 0, 0)

while (initialDate.getHours() < 20) {
  // smallerTimeRange is in 5 minute interval
  smallerTimeRange.push(new Date(initialDate.getTime()))
  initialDate.setMinutes(initialDate.getMinutes() + 5)
}

// Lecturer
const { data: lecturer } = await useFetch<Lecturer>(`lecturers/${route.params.lecturerId}/schedule/full`, {
  baseURL: 'https://kampus-sggw-api.azurewebsites.net/api/',
})

if (lecturer.value) {
  lecturer.value.subjects = lecturer.value.subjects?.map((subject) => {
    const { x, y, width, height } = calculatePosition(subject, subject.groups!.map(x => x.name))
    subject.x = x
    subject.y = y
    subject.width = width
    subject.height = height
    return subject
  })
}

// Tabs
const tabIndex = ref(daysOfWeek.findIndex(day => day.value === route.query.day))

function handleTabChange(index: number) {
  tabIndex.value = index
  router.push({
    query: {
      day: daysOfWeek[index].value,
    },
  })
}
</script>

<template>
  <div class="h-screen">
    <div class="flex w-full flex-wrap items-start justify-between gap-6 border-b border-b-gray-200 px-12 py-9">
      <div>
        <h1 class="text-2xl font-bold leading-9 text-gray-900">
          Plan zajęć wykładowcy
        </h1>

        <p class="font-semibold text-indigo-600">
          {{ lecturer?.academicDegree }} {{ lecturer?.firstName }} {{ lecturer?.surname }}
        </p>
      </div>

      <TabGroup :selected-index="tabIndex" @change="handleTabChange">
        <TabList class="flex w-full gap-2">
          <Tab v-for="(day, index) in daysOfWeek" :key="index" v-slot="{ selected }" as="template">
            <base-button :variant="selected ? 'primary' : 'secondary'">
              {{ day.label }}
            </base-button>
          </Tab>
        </TabList>
      </TabGroup>
    </div>

    <div class="h-screen overflow-x-scroll">
      <div class="h-full select-none">
        <div class="flex w-full flex-col">
          <div class="flex flex-col">
            <div class="flex">
              <div class="flex h-12 w-[10.5rem] shrink-0" />
              <div v-for="(time, index) in timeRange" v-once :key="index" class="flex h-12 shrink-0 items-center justify-between whitespace-nowrap text-center font-medium text-gray-700" :class="[index !== timeRange.length - 1 && 'w-36']">
                <div>
                  {{ time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) }}
                </div>
              </div>
            </div>

            <div class="flex">
              <div class="flex h-12 w-48 shrink-0 border-b-2 border-r-2" />
              <div v-for="index in (timeRange.length - 1) * 6" v-once :key="index" class="flex h-12 w-6 shrink-0 items-center justify-between whitespace-nowrap border-b-2 border-r border-gray-200 text-center font-medium text-gray-700" :class="[index % 6 === 0 ? 'border-r-2' : 'border-r']" />
            </div>
          </div>
        </div>

        <div class="flex">
          <div class="flex h-full w-fit flex-col">
            <template v-for="(subject, index) in lecturer!.subjects" :key="index">
              <div v-for="(group, index2) in subject.groups!" :id="group.id" :key="index2" class="flex h-40 w-48 shrink-0 flex-col items-center justify-center border-x-2 border-b-2 border-gray-200 text-center text-xs text-gray-700">
                <span>
                  <b>Grupa </b>{{ group.name }}
                </span>
                <b>{{ subject.schedule.name }}</b>
                <span>{{ subject.schedule.fieldOfStudy }}</span>
                <span>Rok {{ subject.schedule.year }}, semestr {{ subject.schedule.semester }}</span>
              </div>
            </template>
          </div>

          <div class="relative flex flex-col">
            <div v-for="(subject, index) in lecturer!.subjects" :id="subject.id" :key="index" :style="{ transform: `translate(${subject.x}px, ${subject.y}px)`, width: `${subject.width}px`, height: `${subject.height}px` }" class="absolute pb-0.5 pr-0.5">
              <base-lesson v-bind="subject" />
            </div>

            <div v-for="(group, index) in lecturer!.subjects!.map(x => x.groups!).flat()" v-once :key="index" class="flex h-40">
              <div v-for="(time, index2) in smallerTimeRange" v-once :key="index2" class="flex h-40 w-6 shrink-0 items-center justify-between border-b-2 border-gray-200 text-center text-xs text-gray-700" :data-group="group.id" :data-time="time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })" :class="[(time.getMinutes() === 55 || time.getMinutes() === 25) ? 'border-r-2' : 'border-r']" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
