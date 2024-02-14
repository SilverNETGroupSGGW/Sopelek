<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/20/solid'
import type { Subject } from '~/types'

const props = defineProps<Subject & {
  container: HTMLElement | null
}>()

defineEmits<{
  (e: 'edit'): void
}>()

// Hooks
const mouse = useMouse()

// Data
const scheduler = useScheduler()
const subjects = useSubjects()
const { lessonTypes } = useData()

// Utils
function calculateEndTime() {
  if (!props.startTime || !props.duration)
    return null

  const startTime = new Date(`1970-01-01T${props.startTime}`)
  const duration = new Date(`1970-01-01T${props.duration}`)

  const endTime = new Date(startTime.getTime() + duration.getTime())
  endTime.setHours(endTime.getHours() + 2)

  return endTime.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })
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

// Delete
const isDeleting = ref(false)
const deleteDialog = ref(false)

async function handleDelete() {
  isDeleting.value = true

  try {
    await subjects.delete(props.id)
  }
  catch {
  }
  finally {
    scheduler.schedule!.subjects = scheduler.schedule!.subjects.filter(x => x.id !== props.id)
    deleteDialog.value = false
    isDeleting.value = false
  }
}
</script>

<template>
  <div :id="id" :style="{ width: `${width! - 2}px`, height: `${height! - 2}px`, transform: `translate(${x}px, ${y}px)`, backgroundColor: stringToColor(name ?? '').backgroundColor, borderColor: stringToColor(name ?? '').borderColor }" class="absolute flex size-full flex-col items-start rounded-md border-2 p-4 text-left outline-none" :class="[mouse.cursor, ghost && 'opacity-50']">
    <div class="flex w-full flex-wrap items-center justify-between gap-x-2">
      <small v-if="startTime && duration" class="text-xs text-gray-600">
        {{ startTime.slice(0, -3) }} - {{ calculateEndTime() }}
      </small>

      <div class="flex items-center gap-2">
        <button class="text-xs text-indigo-600" @click="$emit('edit')">
          Edytuj
        </button>
        <button class="text-xs text-red-600" @click="deleteDialog = true">
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
      <base-button variant="danger" :loading="isDeleting" @click="handleDelete">
        Usuń
      </base-button>
    </div>
  </base-dialog>
</template>
