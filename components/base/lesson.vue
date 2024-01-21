<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/20/solid'
import type { Subject } from '~/types'

const props = defineProps<Subject>()

const emits = defineEmits<{
  (e: 'delete', id: string): void
}>()

const { lessonTypes } = useData()

const subjects = useSubjects()
const deleteDialog = ref(false)

function handleDelete() {
  subjects.delete(props.id)
  deleteDialog.value = false
  emits('delete', props.id)
}

function stringToColor(input: string) {
  let hash = 0
  for (let i = 0; i < input.length; i++)
    hash = input.charCodeAt(i) + ((hash << 5) - hash)

  const hue = hash % 360
  const saturation = 75 + (hash % 10)
  const lightness = 95

  return {
    backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
    borderColor: `hsl(${hue}, ${saturation}%, ${lightness - 10}%)`,
  }
}
</script>

<template>
  <div
    :id="id"
    data-lesson
    class="relative flex size-full flex-col items-start rounded-md border-2 p-4 text-left outline-none"
    :class="[
      { 'opacity-50': ghost },
    ]"
    :style="{ zIndex, backgroundColor: stringToColor(name!).backgroundColor, borderColor: stringToColor(name!).borderColor }"
  >
    <div class="flex w-full flex-wrap items-center justify-between">
      <small v-if="startTime && duration" class="text-xs text-gray-600">
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
    <small v-if="classroom" class="text-xs text-gray-700">
      <b>Sala: </b> b. {{ classroom?.building }}, p. {{ classroom?.floor }}, s. {{ classroom?.name }}
    </small>
    <small v-if="groups" class="text-xs text-gray-700">
      <b>Grupy: </b> {{ groups.map(x => x.name).sort().join(', ') }}
    </small>
    <small v-if="isRemote" class="text-xs text-gray-700">
      <b>Zajęcia zdalne</b>
    </small>
    <small v-if="comment" class="text-xs text-gray-700">
      <b>Komentarz: </b> {{ comment }}
    </small>
    <small v-if="conflict" class="text-xs text-red-600">
      <b>Konflikt: </b> {{ conflictMessage }}
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
      <base-button variant="danger" @click="handleDelete">
        Usuń
      </base-button>
    </div>
  </base-dialog>
</template>
