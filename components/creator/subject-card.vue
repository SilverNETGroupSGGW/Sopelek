<script setup lang="ts">
import { IconTrash } from '@tabler/icons-vue'
import { useCreator } from '~/stores/creator/useCreator'
import type { CreatorSubject } from '~/types/creator/SubjectPosition'

const props = defineProps<{
  subject: CreatorSubject

  hasConflict?: boolean
  conflictMessage?: string
  translucent?: boolean
  zIndex?: number
}>()

defineEmits<{
  (e: 'edit'): void
}>()

// Hooks
const mouse = useMouse()
const creator = useCreator()

// Utils
function calculateEndTime() {
  if (!props.subject!.startTime || !props.subject!.duration)
    return null

  const startTime = new Date(`1970-01-01T${props.subject!.startTime}Z`)
  const duration = new Date(`1970-01-01T${props.subject!.duration}Z`)

  const endTime = new Date(startTime.getTime() + duration.getTime())
  endTime.setHours(endTime.getHours() - 1)
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
    // await subjects.delete(props.id)
  }
  catch {
  }
  finally {
    // scheduler.schedule!.subjects = scheduler.schedule!.subjects.filter(x => x.id !== props.id)
    deleteDialog.value = false
    isDeleting.value = false
  }
}
</script>

<template>
  <div
    :id="subject?.id"
    :style="{
      width: `${subject.width!}px`,
      height: `${subject.height!}px`,
      transform: `translate(${subject.x}px, ${subject.y}px)`,
      backgroundColor: stringToColor(subject?.name ?? '').backgroundColor,
      borderColor: stringToColor(subject?.name ?? '').borderColor,
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderRadius: '0.375rem', // rounded-md
      borderWidth: '2px', // border-2
      textAlign: 'left', // text-left
      outline: 'none',
      opacity: translucent ? '0.5' : '1',
    }"
    :class="[mouse.cursor, translucent && 'opacity-50']"
  >
    <div class="flex w-full flex-wrap items-center justify-between gap-x-2">
      <small v-if="subject.startTime && subject.duration" class="text-xs text-gray-600">
        {{ subject.startTime.slice(0, -3) }} - {{ calculateEndTime() }}
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
      {{ subject.name }}
    </p>

    <!-- <small v-if="lecturers && lecturers.length > 0" class="text-xs text-gray-700">
      <b>{{ lecturers[0].academicDegree }} {{ lecturers[0].firstName }} {{ lecturers[0].surname }}</b>
    </small> -->
    <!-- <small v-if="subject.classroom" class="text-xs text-gray-700">
      <b>Sala: </b> b. {{ classroom?.building }}, p. {{ classroom?.floor }}, s. {{ classroom?.name }}
    </small>
    <small v-if="groups" class="text-xs text-gray-700">
      <b>Grupy: </b> {{ groups.map(x => x.name).sort().join(', ') }}
    </small>
    <small v-if="isRemote" class="text-xs text-gray-700">
      <b>Zajęcia zdalne</b>
    </small>
    <small v-if="isConditional" class="text-xs text-gray-700">
      <b>Zajęcia warunkowe</b>
    </small> -->
    <small v-if="subject.comment" class="text-xs text-gray-700">
      <b>Komentarz: </b> {{ subject.comment }}
    </small>
    <!-- <small v-if="conflict" class="text-xs text-red-600">
      <b>Konflikt: </b> {{ conflictMessage }}
    </small> -->
  </div>

  <dialog-creator-delete-subject
    v-model="deleteDialog"
    @canceled="deleteDialog = false"
    @confirmed="handleDelete"
  />
</template>
