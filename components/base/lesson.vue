<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/20/solid'
import type { Subject } from '~/types'
import { SubjectType } from '~/types'

defineProps<Subject>()

const { lessonTypes } = useData()

const subjects = useSubjects()
const deleteDialog = ref(false)
</script>

<template>
  <div
    :id="id"
    class="flex h-full w-full flex-col items-start rounded-md border p-4 text-left outline-none"
    :class="[
      { 'opacity-50': ghost },
      { 'border-purple-600 bg-purple-50': type === SubjectType.Faculty },
      { 'border-yellow-600 bg-yellow-50': type === SubjectType.Laboratories },
      { 'border-indigo-600 bg-indigo-50': type === SubjectType.Lecture },
      { 'border-pink-600 bg-pink-50': type === SubjectType.PracticalClasses },
      { 'border-gray-600 bg-gray-50': type === SubjectType.Unknown },
    ]"
  >
    <div class="flex w-full items-center justify-between">
      <small class="text-xs text-gray-600">
        {{ startTime.slice(0, -3) }} ({{ duration!.slice(0, -3) }}h)
      </small>

      <div class="flex items-center gap-2">
        <NuxtLink :id="`link-${id}`" :to="`/schedules/${scheduleId}/subjects/${id}`" class="text-xs text-indigo-600">
          Edytuj
        </NuxtLink>
        <button :id="`delete-${id}`" class="text-xs text-red-600" @click.prevent="deleteDialog = true">
          Usuń
        </button>
      </div>
    </div>

    <p class="text-left text-sm font-bold text-gray-900">
      {{ name }}
    </p>
    <small class="mb-2 text-xs text-gray-700">
      {{ lessonTypes.find(x => x.value === type)?.label }}
    </small>

    <small v-if="lecturers && lecturers.length > 0" class="text-xs text-gray-700">
      <b>{{ lecturers[0].academicDegree }} {{ lecturers[0].firstName }} {{ lecturers[0].surname }}</b>
    </small>
    <small class="text-xs text-gray-700">
      <b>Sala: </b> b. {{ classroom?.building }}, p. {{ classroom?.floor }}, s. {{ classroom?.name }}
    </small>
    <small v-if="groups" class="text-xs text-gray-700">
      <b>Grupy: </b> {{ groups.map(x => x.name).join(', ') }}
    </small>
  </div>

  <base-dialog v-model="deleteDialog" title="Usuń zajęcia" :icon="TrashIcon">
    <p class="text-base text-gray-700">
      Czy na pewno chcesz usunąć zajęcia?
    </p>

    <div class="mt-6 flex justify-end gap-4">
      <base-button variant="secondary" @click="deleteDialog = false">
        Zamknij
      </base-button>
      <base-button variant="danger" @click="subjects.delete(id)">
        Usuń
      </base-button>
    </div>
  </base-dialog>
</template>
