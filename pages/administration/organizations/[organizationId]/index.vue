<script setup lang="ts">
import { Tab, TabGroup, TabList } from '@headlessui/vue'
import { DayOfWeek } from '~/types'

// Nuxt hooks
const runtimeConfig = useRuntimeConfig()
const route = useRoute()


</script>

<template>
  <div class="h-screen">
    <div class="flex w-full flex-wrap items-start justify-between gap-6 border-b border-b-gray-200 px-12 py-9">
      <div>
        <h1 class="text-2xl font-bold leading-9 text-gray-900">
          Kreator planu zajęć
        </h1>

        <!-- 
            <p class="font-semibold text-indigo-600">
            {{ scheduler.schedule!.name }}
            </p>
        -->
      </div>

      <!-- 
      <TabGroup :selected-index="tabIndex" @change="handleTabChange">
        <TabList class="flex w-full gap-2">
          <Tab v-for="(day, index) in daysOfWeek" :key="index" v-slot="{ selected }" as="template">
            <base-button :variant="selected ? 'primary' : 'secondary'">
              {{ day.label }}
            </base-button>
          </Tab>
        </TabList>
      </TabGroup>
      -->
    </div>

    <!-- 
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

        <div ref="container" class="relative flex w-full flex-col cursor-pointer" @pointerdown.prevent="onPointerDown!" @pointermove.prevent="onPointerMove!">
          <base-lesson v-for="(lesson, index) in scheduler.getSubjectsByDay($route.query.day as DayOfWeek[])" :key="index" :container="container!" v-bind="lesson" @edit="handleLessonEdit(lesson.id)" />

          <div class="size-full" :style="{ backgroundImage: `linear-gradient(to right, #e5e7eb 1px, transparent 1px), repeating-linear-gradient(to bottom, #e5e7eb, #e5e7eb 1px, #fff 1px, #fff 160px)`, backgroundSize: `24px 160px` }" />
        </div>
      </div>
    </div>
    -->
  </div>

  <!--
  <subject-dialog :key="editedSubjectId" v-model="dialog" :schedule-id="($route.params.scheduleId as string)" :subject-id="editedSubjectId" />
  -->
</template>
