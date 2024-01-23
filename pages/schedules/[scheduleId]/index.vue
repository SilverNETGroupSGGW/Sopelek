<script setup lang="ts">
import { Tab, TabGroup, TabList } from '@headlessui/vue'
import { DayOfWeek } from '~/types'

// Nuxt hooks
const route = useRoute()
const router = useRouter()
router.push({
  query: {
    day: route.query.day ?? DayOfWeek.Monday,
  },
})

// Store
const mouse = useMouse()

// Data
const { daysOfWeek, studiesDegrees, studiesModes } = useData()

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
const scheduler = useScheduler()
await scheduler.get(route.params.scheduleId as string)

// Elements
let initialContainer: HTMLDivElement | null = null
const container = ref<HTMLDivElement | null>(null)

let onPointerMove: Function | null = null
let onPointerDown: Function | null = null
let onPointerOut: Function | null = null
let onCreateMove: Function | null = null
let onDragDown: Function | null = null

watchEffect(() => {
  if (container.value)
    initialContainer = container.value;

  ({ onPointerMove, onPointerDown, onPointerOut } = usePointer(scheduler.schedule!, initialContainer));
  ({ onCreateMove } = useCreate(scheduler.schedule!, initialContainer!, route.query.day as DayOfWeek));
  ({ onDragDown } = useDrag(scheduler.schedule!, initialContainer!))
})

// Tabs
const tabIndex = ref(daysOfWeek.findIndex(day => route.query.day ? day.value === route.query.day : 0))

function handleTabChange(index: number) {
  tabIndex.value = index
  router.push({
    query: {
      day: daysOfWeek[index].value,
    },
  })
}

// Delete
function handleDelete(id: string) {
  scheduler.schedule!.subjects = scheduler.schedule!.subjects.filter(subject => subject.id !== id)
}

// Copy subject
// Due to event bubbling, we must keep the logic here
function handleCopy(event: MouseEvent, id: string) {
  mouse.currentSubject = {
    ...scheduler.schedule!.subjects.find(subject => subject.id === id)!,
    id: 'create',
    ghost: true,
  }

  scheduler.schedule!.subjects.push(mouse.currentSubject)

  mouse.isCopying = true
  onDragDown!(event)
}
</script>

<template>
  <div class="h-screen">
    <div class="flex w-full flex-wrap items-start justify-between gap-6 border-b border-b-gray-200 px-12 py-9">
      <div>
        <h1 class="text-2xl font-bold leading-9 text-gray-900">
          Kreator planu zajęć
        </h1>

        <p class="font-semibold text-indigo-600">
          {{ scheduler.schedule!.name }}
        </p>
        <p class="text-indigo-600">
          {{ scheduler.schedule!.faculty }}, {{ scheduler.schedule!.fieldOfStudy }}
        </p>
        <p class="text-indigo-600">
          {{ studiesModes.find(x => x.type === scheduler.schedule!.studyMode)?.value }}, {{ studiesDegrees.find(x => x.type === scheduler.schedule!.degreeOfStudy)?.value }}
        </p>
        <p class="text-gray-700">
          Rok {{ scheduler.schedule!.year }}, semestr {{ scheduler.schedule!.semester }}
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
        <div class="sticky top-0 z-50 flex w-max flex-col border-b-2 border-b-gray-200 bg-white">
          <div class="flex w-max flex-col">
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
            <div v-for="(group, index) in scheduler.schedule!.groups" v-once :id="group.id" :key="index" class="flex h-40 w-48 shrink-0 items-center justify-center border-x-2 border-b-2 border-gray-200 text-center text-xs text-gray-700">
              {{ group.name }}
            </div>
          </div>

          <div ref="container" class="relative flex flex-col" @pointerdown.prevent="onCreateMove!">
            <div v-for="(subject, index) in scheduler.getSubjectsByDay(route.query.day as DayOfWeek ?? DayOfWeek.Monday)" :id="subject.id" :key="index" :style="{ transform: `translate(${subject.x}px, ${subject.y}px)`, width: `${subject.width}px`, height: `${subject.height}px` }" class="absolute pb-0.5 pr-0.5" @pointerdown.prevent="onPointerDown!($event, subject)" @pointermove.prevent="onPointerMove!" @pointerout.prevent="onPointerOut!">
              <base-subject v-bind="subject" @delete="handleDelete" @copy="handleCopy" />
            </div>

            <div v-for="(group, index) in scheduler.schedule!.groups" v-once :key="index" class="flex h-40">
              <div v-for="(time, index2) in smallerTimeRange" v-once :key="index2" class="flex h-40 w-6 shrink-0 items-center justify-between border-b-2 border-gray-200 text-center text-xs text-gray-700" :data-group="group.id" :data-time="time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })" :class="[(time.getMinutes() === 55 || time.getMinutes() === 25) ? 'border-r-2' : 'border-r']" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
