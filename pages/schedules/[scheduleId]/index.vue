<script setup lang="ts">
import { Tab, TabGroup, TabList } from '@headlessui/vue'
import { DayOfWeek } from '~/types'

// Nuxt hooks
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

if (!route.query.day) {
  await navigateTo({
    query: {
      day: DayOfWeek.Monday,
    },
  })
}

// Container
const container = ref<HTMLElement | null>(null)

let onPointerDown: ((e: PointerEvent) => void) | null = null
let onPointerMove: ((e: PointerEvent) => void) | null = null

watchEffect(() => {
  if (container.value) {
    ;({ onPointerDown, onPointerMove } = usePointer(container.value, route.query.day as DayOfWeek))
  }
})

// Data
const { daysOfWeek, studiesDegrees, studiesModes } = useData()

// Time range
const timeRange: Date[] = []
const initialDate = new Date(1970, 0, 1, 8, 0, 0, 0)

while (initialDate.getHours() < 20 || (initialDate.getHours() === 20 && initialDate.getMinutes() === 0)) {
  // timeRange is in 30 minute interval
  timeRange.push(new Date(initialDate.getTime()))
  initialDate.setMinutes(initialDate.getMinutes() + 30)
}

// Subjects
const scheduler = useScheduler()
await scheduler.get(route.params.scheduleId as string)

// Tabs
const tabIndex = ref(daysOfWeek.findIndex(day => day.value === route.query.day))

async function handleTabChange(index: number) {
  tabIndex.value = index
  await navigateTo({
    query: {
      day: daysOfWeek[index].value,
    },
  })
}

// Subject dialog
const dialog = ref(false)
const editedSubjectId = ref('')

function handleLessonEdit(id: string) {
  dialog.value = true
  editedSubjectId.value = id
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

    <div class="h-screen w-max select-none overflow-x-scroll">
      <div class="sticky top-0 z-50 flex w-max flex-col bg-white">
        <div class="flex">
          <div class="flex h-12 w-[10.5rem] shrink-0" />
          <p v-for="(time, index) in timeRange" v-once :key="index" class="flex h-12 items-center whitespace-nowrap text-center font-medium text-gray-700" :class="[index !== timeRange.length - 1 && 'w-36']">
            {{ time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) }}
          </p>
        </div>

        <div class="flex">
          <div class="h-12 w-48" />
          <div class="h-12 w-[calc(100%_-_12rem)]" :style="{ backgroundImage: `repeating-linear-gradient(to right, #e5e7eb, #e5e7eb 1px, #fff 1px, #fff ${runtimeConfig.public.intervalWidth}px)`, backgroundSize: `3480px ${runtimeConfig.public.intervalWidth}px` }" />
        </div>
      </div>

      <div class="flex w-full">
        <div>
          <div v-for="(group, index) in scheduler.schedule!.groups" v-once :id="group.id" :key="index" class="flex w-48 shrink-0 items-center justify-center border-t border-t-gray-200 text-center text-xs text-gray-700" :style="{ height: `${runtimeConfig.public.intervalHeight}px` }">
            {{ group.name }}
          </div>
        </div>

        <div ref="container" class="relative flex w-full flex-col" @pointerdown.prevent="onPointerDown!" @pointermove.prevent="onPointerMove!">
          <base-lesson v-for="(lesson, index) in scheduler.getSubjectsByDay($route.query.day as DayOfWeek)" :key="index" :container="container!" v-bind="lesson" @edit="handleLessonEdit(lesson.id)" />

          <div class="size-full" :style="{ backgroundImage: `linear-gradient(to right, #e5e7eb 1px, transparent 1px), repeating-linear-gradient(to bottom, #e5e7eb, #e5e7eb 1px, #fff 1px, #fff 160px)`, backgroundSize: `24px 160px` }" />
        </div>
      </div>
    </div>
  </div>

  <subject-dialog v-model="dialog" :schedule-id="($route.params.scheduleId as string)" :subject-id="editedSubjectId" />
</template>
