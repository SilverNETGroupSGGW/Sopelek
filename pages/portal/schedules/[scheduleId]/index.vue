<script setup lang="ts">
// import { Tab, TabGroup, TabList } from '@headlessui/vue'
import { useCreator } from '~/stores/creator/useCreator'
import { DayOfWeek } from '~/types'

// // Nuxt hooks
// const runtimeConfig = useRuntimeConfig()

const route = useRoute()

if (!route.query.day) {
  await navigateTo({
    query: {
      day: DayOfWeek.Monday,
    },
  })
}

const selectedDay = route.query.day as DayOfWeek
const scheduleId: string = route.params.scheduleId as string

// let onPointerDown: ((e: PointerEvent) => void) | null = null
// let onPointerMove: ((e: PointerEvent) => void) | null = null

// watchEffect(() => {
//   if (container.value) {
//     ;({ onPointerDown, onPointerMove } = usePointer(container.value, route.query.day as DayOfWeek))
//   }
// })

// Data
const { daysOfWeek } = useData()

// Subjects
const creator = useCreator()
await creator.get(scheduleId)

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
  <div class="flex w-full flex-wrap items-start justify-between gap-6 border-b border-b-gray-200 px-12 py-9">
    <div>
      <h1 class="text-2xl font-bold leading-9 text-gray-900">
        Kreator planu zajęć
      </h1>

      <base-spinner v-if="creator.isLoading" />

      <p v-if="!creator.isLoading" class="font-semibold text-indigo-600">
        {{ creator.schedule!.name }}
      </p>
    </div>

    <creator-day-picker
      :selected-day="selectedDay"
      @day-change="(day: string) => {
        creator.dayOfWeek = day as DayOfWeek
      }"
    />
  </div>

  <creator-control />

  <!--
  <subject-dialog
    :key="editedSubjectId"
    v-model="dialog"
    :schedule-id="($route.params.scheduleId as string)"
    :subject-id="editedSubjectId" />
  -->
</template>
