<script setup lang="ts">
import { Tab, TabGroup, TabList } from '@headlessui/vue'
import { DayOfWeek, type Group, type Schedule, type Subject } from '~/types'

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

// Elements
let initialContainer: HTMLDivElement | null = null
const container = ref<HTMLDivElement | null>(null)
onMounted(() => {
  initialContainer = container.value!
})

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

// Subjects
const { calculatePosition } = useSubject()

const groups = ref<Group[] | null>()
const subjects = ref<Subject[] | null>(null)

const { data: schedule } = await useFetch<Schedule>(`Schedules/${route.params.scheduleId}`, {
  baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
})

const { data: _groups } = await useFetch<Group[]>(`Groups/Schedule/${route.params.scheduleId}`, {
  baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
})

groups.value = _groups.value!.sort((a, b) => a.name.localeCompare(b.name)) /* temp client-side sorting */

const { data: _subjects } = await useFetch<Subject[]>(`Subjects/schedule/${route.params.scheduleId}/extended`, {
  baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
})

if (_subjects.value) {
  subjects.value = _subjects.value
    .map((subject) => {
      const { x, y, width, height } = calculatePosition(subject, groups.value!.map(x => x.name))
      return { ...subject, x, y, width, height }
    })
}

const filteredSubjects = computed(() =>
  subjects.value?.filter(subject => route.query.day ? subject.dayOfWeek === route.query.day : subject.dayOfWeek === DayOfWeek.Monday),
)

// Hooks
let onPointerDown: Function | null = null
let onCreateMove: Function | null = null

watchEffect(() => {
  if (container.value) {
    ({ onPointerDown } = useResize(subjects.value!, groups.value!, initialContainer));
    ({ onCreateMove } = useCreate(subjects.value!, groups.value!, initialContainer, route.params.scheduleId as string))
  }
})

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
  <div class="flex w-full flex-wrap items-start justify-between gap-4 border-b border-b-gray-200 px-12 py-9">
    <div>
      <h1 class="text-2xl font-bold leading-9 text-gray-900">
        Kreator planu zajęć
      </h1>

      <p class="font-semibold text-indigo-600">
        {{ schedule?.name }}
      </p>
      <p class="text-indigo-600">
        {{ schedule?.faculty }}, {{ schedule?.fieldOfStudy }}, {{ schedule?.studyMode }}, {{ schedule?.degreeOfStudy }}
      </p>
      <p class="text-gray-700">
        Rok {{ schedule?.year }}, semestr {{ schedule?.semester }}
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

  <div class="overflow-x-scroll">
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
          <div v-for="(group, index) in groups" v-once :id="group.id" :key="index" class="flex h-48 w-48 shrink-0 items-center justify-center border-x-2 border-b-2 border-gray-200 text-center text-xs text-gray-700">
            {{ group.name }}
          </div>
        </div>

        <div ref="container" class="relative flex flex-col" @pointerdown.prevent="onCreateMove!">
          <div v-for="(subject, index) in filteredSubjects" :id="subject.id" :key="index" :style="{ transform: `translate(${subject.x}px, ${subject.y}px)`, width: `${subject.width}px`, height: `${subject.height}px` }" class="absolute pb-0.5 pr-0.5 hover:cursor-move" @pointerdown.prevent="onPointerDown!($event, subject)">
            <base-lesson v-bind="subject" />
          </div>

          <div v-for="(group, index) in groups" v-once :key="index" class="flex h-48">
            <div v-for="(time, index2) in smallerTimeRange" v-once :key="index2" class="flex h-48 w-6 shrink-0 items-center justify-between border-b-2 border-gray-200 text-center text-xs text-gray-700" :data-group="group.id" :data-time="time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })" :class="[(time.getMinutes() === 55 || time.getMinutes() === 25) ? 'border-r-2' : 'border-r']" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
