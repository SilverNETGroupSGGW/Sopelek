<script setup lang="ts">
import { useCreator } from '~/stores/creator/useCreator'

const creator = useCreator()

// const container = ref<HTMLElement | null>(null)
</script>

<template>
  <div
    v-if="!creator.isLoading"
    id="mainContainer"
    class="h-screen w-max select-none overflow-x-scroll"
  >
    <creator-column-heading />

    <div class="relative flex w-full">
      <creator-row-heading />
      <creator-subject-cards-layer />
      <creator-mesh />

      <!-- <div
        ref="container"
        class="relative flex w-full cursor-pointer flex-col"
        @pointerdown.prevent="onPointerDown!"
        @pointermove.prevent="onPointerMove!"
      > -->

      <!-- <base-lesson
          v-for="(lesson, index) in creator.getSubjectsByDay($route.query.day as DayOfWeek[])"
          :key="index"
          :container="container!"
          v-bind="lesson"
          @edit="handleLessonEdit(lesson.id)"
        /> -->
    </div>
  </div>
</template>
