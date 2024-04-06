<script setup lang="ts">
import { CalendarIcon, ChartBarIcon, MagnifyingGlassIcon, TrashIcon, UserIcon, ViewfinderCircleIcon } from '@heroicons/vue/24/solid'
import { CalendarDate, type DateValue } from '@internationalized/date'
import { DialogClose, DialogDescription } from 'radix-vue'

const route = useRoute()

// Supabase
const schedules = useSchedules()
await schedules.get(Number.parseInt(route.params.id as string))

// Utils
const data = useData()
const { currentItem, createDialog, deleteDialog, handleCreate, handleDelete, handleDialogOpen, handleUpdate, isSubmitting, search, updateDialog } = useCrud(schedules.data.schedules)

const start = ref<DateValue>()
watchEffect(() => {
  if (start.value)
    currentItem.value.start = `${start.value.year}-${start.value.month}-${start.value.day}`
})

watchEffect(() => {
  if (currentItem.value.start) {
    const [year, month, day] = currentItem.value.start.split('-')
    start.value = new CalendarDate(Number(year), Number(month), Number(day))
  }
})
</script>

<template>
  <div class="flex w-full flex-wrap items-center justify-between gap-4 border-b bg-gray-50 px-12 py-4">
    <span>
      <h1 class="text-2xl font-bold leading-9 text-gray-950">
        Plany zajęć
      </h1>
      <p class="font-medium text-gray-800">
        {{ schedules.data.field }}, {{ data.studyTypes[schedules.data.type - 1] }} {{ data.studyModes[schedules.data.mode - 1] }}
      </p>
      <p class="text-gray-800">
        od roku akademickiego {{ new Date(schedules.data.start).getFullYear() }}/{{ new Date(schedules.data.start).getFullYear() + 1 }}
      </p>
    </span>

    <div class="flex items-center gap-4">
      <base-input v-model="search" placeholder="Szukaj" class="w-96" :icon="MagnifyingGlassIcon" />

      <base-dialog :open="createDialog" title="Utwórz plan zajęć" :icon="UserIcon">
        <template #trigger>
          <base-button class="h-12" variant="primary" @click="handleDialogOpen('create')">
            Dodaj plan zajęć
          </base-button>
        </template>

        <form class="flex flex-col gap-4" @submit.prevent="handleCreate(currentItem, async() => await schedules.create(currentItem, Number.parseInt(route.params.id as string)))">
          <base-date-input v-model="start" :icon="CalendarIcon" label="Data rozpoczęcia" />
          <base-input v-model="currentItem.name" :icon="ViewfinderCircleIcon" label="Nazwa" />
          <base-input v-model="currentItem.term" type="number" :icon="ChartBarIcon" label="Semestr" />

          <div class="mt-6 flex justify-end gap-4">
            <DialogClose as-child>
              <base-button variant="secondary" type="button">
                Zamknij
              </base-button>
            </DialogClose>
            <base-button variant="primary" type="submit" :disabled="isSubmitting" :loading="isSubmitting">
              Zapisz zmiany
            </base-button>
          </div>
        </form>
      </base-dialog>
    </div>
  </div>

  <base-table :search="search" :data="schedules.data.schedules" :columns="schedules.columns">
    <template #name="{ cell }">
      <span class="text-base font-medium text-gray-900">{{ cell.name }}</span>
      <br>
      <span class="text-sm text-gray-700">
        od {{ new Date(cell.start).toLocaleDateString('pl-PL') }}
        <br>
        semestr {{ cell.term }}
      </span>
    </template>

    <template #actions="{ cell }">
      <div class="flex gap-4">
        <base-dialog :open="updateDialog" title="Edytuj plan zajęć" :icon="UserIcon">
          <template #trigger>
            <base-button variant="primary" @click="handleDialogOpen('update', cell.id)">
              Edytuj
            </base-button>
          </template>

          <form class="flex flex-col gap-4" @submit.prevent="handleUpdate(currentItem, async() => await schedules.update(currentItem))">
            <base-date-input v-model="start" :icon="CalendarIcon" label="Data rozpoczęcia" />
            <base-input v-model="currentItem.name" :icon="ViewfinderCircleIcon" label="Nazwa" />
            <base-input v-model="currentItem.term" type="number" :icon="ChartBarIcon" label="Semestr" />

            <div class="mt-6 flex justify-end gap-4">
              <DialogClose as-child>
                <base-button variant="secondary">
                  Zamknij
                </base-button>
              </DialogClose>
              <base-button variant="primary" type="submit" :disabled="isSubmitting" :loading="isSubmitting">
                Zapisz zmiany
              </base-button>
            </div>
          </form>
        </base-dialog>

        <base-dialog :open="deleteDialog" title="Usuń plan zajęć" :icon="TrashIcon">
          <template #trigger>
            <base-button variant="danger" @click="handleDialogOpen('delete', cell.id)">
              Usuń
            </base-button>
          </template>

          <form @submit.prevent="handleDelete(currentItem, async() => await schedules.delete(currentItem))">
            <DialogDescription class="text-base text-gray-700">
              Czy na pewno chcesz usunąć plan?
            </DialogDescription>

            <div class="mt-6 flex justify-end gap-4">
              <DialogClose as-child>
                <base-button variant="secondary" type="button">
                  Zamknij
                </base-button>
              </DialogClose>
              <base-button variant="danger" :disabled="isSubmitting" :loading="isSubmitting" type="submit">
                Usuń
              </base-button>
            </div>
          </form>
        </base-dialog>
      </div>
    </template>
  </base-table>
</template>
