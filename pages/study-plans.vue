<script setup lang="ts">
import { PhCalendar, PhDevices, PhMagnifyingGlass, PhPencilSimpleLine, PhTrash, PhTrophy, PhUserPlus, PhVideo } from '@phosphor-icons/vue'
import { CalendarDate, type DateValue } from '@internationalized/date'
import { DialogDescription } from 'radix-vue'

// Supabase
const studyPlans = useStudyPlans()
await studyPlans.get()

// Utils
const data = useData()

const { mapArrayToLabelValue } = useArray()
const { currentItem, createDialog, deleteDialog, handleCreate, handleDelete, handleDialogOpen, handleUpdate, isSubmitting, search, updateDialog } = useCrud(studyPlans.data)

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
  else {
    start.value = undefined
  }
})
</script>

<template>
  <div class="flex w-full flex-wrap items-center justify-between gap-4 border-b bg-gray-50 px-12 py-4">
    <h1 class="text-2xl font-bold leading-9 text-gray-950">
      Plany studiów
    </h1>

    <div class="flex items-center gap-4">
      <base-input v-model="search" placeholder="Szukaj" class="w-96" :icon="PhMagnifyingGlass" />

      <base-dialog :open="createDialog" title="Utwórz plan studiów" :icon="PhUserPlus" @update:open="createDialog = $event">
        <template #trigger>
          <base-button class="h-12" variant="primary" @click="handleDialogOpen('create')">
            Dodaj plan studiów
          </base-button>
        </template>

        <form class="flex flex-col gap-4" @submit.prevent="handleCreate(currentItem, async() => await studyPlans.create(currentItem))">
          <base-date-input v-model="start" :icon="PhCalendar" label="Data rozpoczęcia" />
          <base-input v-model="currentItem.field" :icon="PhVideo" label="Kierunek" />
          <base-select v-model.number="currentItem.type" :icon="PhTrophy" label="Typ studiów" :options="mapArrayToLabelValue(data.studyTypes)" />
          <base-select v-model.number="currentItem.mode" :icon="PhDevices" label="Tryb studiów" :options="mapArrayToLabelValue(data.studyModes)" />

          <div class="mt-6 flex justify-end gap-4">
            <base-button variant="secondary" type="button" @click="createDialog = false">
              Zamknij
            </base-button>
            <base-button variant="primary" type="submit" :disabled="isSubmitting" :loading="isSubmitting">
              Zapisz zmiany
            </base-button>
          </div>
        </form>
      </base-dialog>
    </div>
  </div>

  <base-table :search="search" :data="studyPlans.data" :columns="studyPlans.columns">
    <template #name="{ cell }">
      <span class="text-base font-medium text-gray-900">{{ cell.field }}</span>
      <br>
      <span class="text-sm text-gray-700">
        od roku akademickiego {{ new Date(cell.start).getFullYear() }}/{{ new Date(cell.start).getFullYear() + 1 }}
        <br>
        {{ data.studyTypes[cell.type - 1] }}, {{ data.studyModes[cell.mode - 1] }}
        <br>
      </span>
    </template>

    <template #actions="{ cell }">
      <div class="flex gap-4">
        <base-dialog :open="updateDialog" title="Edytuj plan studiów" :icon="PhPencilSimpleLine" @update:open="updateDialog = $event">
          <template #trigger>
            <base-button variant="primary" @click="handleDialogOpen('update', cell.id)">
              Edytuj
            </base-button>
          </template>

          <form class="flex flex-col gap-4" @submit.prevent="handleUpdate(currentItem, async() => await studyPlans.update(currentItem))">
            <base-date-input v-model="start" :icon="PhCalendar" label="Data rozpoczęcia" />
            <base-input v-model="currentItem.field" :icon="PhVideo" label="Kierunek" />
            <base-select v-model.number="currentItem.type" :icon="PhTrophy" label="Typ studiów" :options="mapArrayToLabelValue(data.studyTypes)" />
            <base-select v-model.number="currentItem.mode" :icon="PhDevices" label="Tryb studiów" :options="mapArrayToLabelValue(data.studyModes)" />

            <div class="mt-6 flex justify-end gap-4">
              <base-button variant="secondary" type="button" @click="updateDialog = false">
                Zamknij
              </base-button>
              <base-button variant="primary" type="submit" :disabled="isSubmitting" :loading="isSubmitting">
                Zapisz zmiany
              </base-button>
            </div>
          </form>
        </base-dialog>

        <base-button variant="secondary" :to="`/schedules/${cell.id}`">
          Plany zajęć
        </base-button>

        <base-dialog :open="deleteDialog" title="Usuń plan studiów" :icon="PhTrash" @update:open="deleteDialog = $event">
          <template #trigger>
            <base-button variant="danger" @click="handleDialogOpen('delete', cell.id)">
              Usuń
            </base-button>
          </template>

          <form @submit.prevent="handleDelete(currentItem, async() => await studyPlans.delete(currentItem))">
            <DialogDescription class="text-base text-gray-700">
              Czy na pewno chcesz usunąć plan?
            </DialogDescription>

            <div class="mt-6 flex justify-end gap-4">
              <base-button variant="secondary" type="button" @click="deleteDialog = false">
                Zamknij
              </base-button>
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
