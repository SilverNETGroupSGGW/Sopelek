<script setup lang="ts">
import { CalendarIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon, TrophyIcon, UserIcon, ViewfinderCircleIcon } from '@heroicons/vue/24/solid'
import { DialogClose, DialogDescription } from 'radix-vue'

// Supabase
const studyPlans = useStudyPlans()
await studyPlans.get()

// Utils
const data = useData()

const { mapArrayToLabelValue } = useArray()
const { currentItem, createDialog, deleteDialog, handleCreate, handleDelete, handleDialogOpen, handleUpdate, isSubmitting, search, updateDialog } = useCrud(studyPlans.data)
</script>

<template>
  <div class="flex w-full flex-wrap items-center justify-between gap-4 border border-b-gray-200 px-12 py-9">
    <div>
      <h1 class="text-2xl font-bold leading-9 text-gray-950">
        Plany studiów
      </h1>
      <p class="text-base text-gray-700">
        <ul class="list-inside list-disc">
          <li>Plan studiów zawiera informacje o kierunku, trybie i stopniu studiów, oraz o dacie rozpoczęcia obowiązywania planu.</li>
          <li>Pod plany studiów należy podpinać plany zajęć.</li>
        </ul>
      </p>
    </div>

    <div class="flex gap-4">
      <base-input v-model="search" placeholder="Szukaj" class="w-96" :icon="MagnifyingGlassIcon" />

      <base-dialog :open="createDialog" title="Utwórz plan studiów" :icon="UserIcon">
        <template #trigger>
          <base-button class="h-12" variant="primary" @click="handleDialogOpen('create')">
            Dodaj kierunek
          </base-button>
        </template>

        <form class="flex flex-col gap-4" @submit.prevent="handleCreate(currentItem, async() => await studyPlans.create(currentItem))">
          <base-input v-model="currentItem.start" :icon="CalendarIcon" label="Data rozpoczęcia" />
          <base-input v-model="currentItem.name" :icon="PencilIcon" label="Nazwa" />
          <base-input v-model="currentItem.field" :icon="ViewfinderCircleIcon" label="Kierunek" />
          <base-select v-model.number="currentItem.type" :icon="TrophyIcon" label="Tryb studiów" :options="mapArrayToLabelValue(data.studyTypes)" />

          <div class="mt-6 flex justify-end gap-4">
            <DialogClose aria-label="Close">
              <base-button variant="secondary" type="button" @click="createDialog = false">
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

  <base-table :search="search" :data="studyPlans.data" :columns="studyPlans.columns">
    <template #name="{ cell }">
      <span class="text-base font-medium text-gray-900">{{ cell.name }}</span>
      <br>
      <span class="text-sm text-gray-700">
        od {{ new Date(cell.start).toLocaleDateString('pl-PL') }} r.
        <br>
        {{ cell.field }}
        <br>
      </span>
    </template>

    <template #actions="{ cell }">
      <div class="flex gap-4">
        <base-dialog :open="updateDialog" title="Edytuj plan studiów" :icon="UserIcon">
          <template #trigger>
            <base-button variant="primary" @click="handleDialogOpen('update', cell.id)">
              Edytuj
            </base-button>
          </template>

          <form class="flex flex-col gap-4" @submit.prevent="handleUpdate(currentItem, async() => await studyPlans.update(currentItem))">
            <base-input v-model="currentItem.start" :icon="CalendarIcon" label="Data rozpoczęcia" />
            <base-input v-model="currentItem.name" :icon="PencilIcon" label="Nazwa" />
            <base-input v-model="currentItem.field" :icon="ViewfinderCircleIcon" label="Kierunek" />
            <base-select v-model.number="currentItem.type" :icon="TrophyIcon" label="Tryb studiów" :options="mapArrayToLabelValue(data.studyTypes)" />

            <div class="mt-6 flex justify-end gap-4">
              <DialogClose aria-label="Close">
                <base-button variant="secondary" @click="updateDialog = false">
                  Zamknij
                </base-button>
              </DialogClose>
              <base-button variant="primary" type="submit" :disabled="isSubmitting" :loading="isSubmitting">
                Zapisz zmiany
              </base-button>
            </div>
          </form>
        </base-dialog>

        <base-dialog :open="deleteDialog" title="Usuń plan studiów" :icon="TrashIcon">
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
              <DialogClose aria-label="Close">
                <base-button variant="secondary" type="button" @click="deleteDialog = false">
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
