<script setup lang="ts">
import { AtSymbolIcon, MagnifyingGlassIcon, TrashIcon, TrophyIcon, UserIcon, ViewfinderCircleIcon } from '@heroicons/vue/24/solid'
import { DialogClose, DialogDescription } from 'radix-vue'

// Supabase
const lecturers = useLecturers()
await lecturers.get()

// Utils
const data = useData()

const { mapArrayToLabelValue } = useArray()
const { currentItem, createDialog, deleteDialog, handleCreate, handleDelete, handleDialogOpen, handleUpdate, isSubmitting, search, updateDialog } = useCrud(lecturers.data)
</script>

<template>
  <div class="flex w-full flex-wrap items-center justify-between gap-4 border-b bg-gray-50 px-12 py-4">
    <h1 class="text-2xl font-bold leading-9 text-gray-950">
      Wykładowcy
    </h1>

    <div class="flex items-center gap-4">
      <base-input v-model="search" placeholder="Szukaj" class="w-96" :icon="MagnifyingGlassIcon" />

      <base-dialog :open="createDialog" title="Utwórz wykładowcę" :icon="UserIcon">
        <template #trigger>
          <base-button class="h-12" variant="primary" @click="handleDialogOpen('create')">
            Dodaj wykładowcę
          </base-button>
        </template>

        <form class="flex flex-col gap-4" @submit.prevent="handleCreate(currentItem, async() => await lecturers.create(currentItem))">
          <base-select v-model.number="currentItem.degree" :icon="TrophyIcon" label="Stopień naukowy" :options="mapArrayToLabelValue(data.degrees)" />
          <base-input v-model="currentItem.name" :icon="ViewfinderCircleIcon" label="Imię i nazwisko" />
          <base-input v-model="currentItem.email" type="email" :icon="AtSymbolIcon" label="Email" />

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

  <base-table :search="search" :data="lecturers.data" :columns="lecturers.columns">
    <template #name="{ cell }">
      <span class="text-base font-medium text-gray-900">{{ data.degrees[cell.degree - 1] }} {{ cell.name }}</span>
      <br>
      <a class="text-sm text-indigo-600 underline" :href="`mailto:${cell.email}`">
        {{ cell.email }}
      </a>
    </template>

    <template #actions="{ cell }">
      <div class="flex gap-4">
        <base-dialog :open="updateDialog" title="Edytuj wykładowcę" :icon="UserIcon">
          <template #trigger>
            <base-button variant="primary" @click="handleDialogOpen('update', cell.id)">
              Edytuj
            </base-button>
          </template>

          <form class="flex flex-col gap-4" @submit.prevent="handleUpdate(currentItem, async() => await lecturers.update(currentItem))">
            <base-select v-model.number="currentItem.degree" :icon="TrophyIcon" label="Stopień naukowy" :options="mapArrayToLabelValue(data.degrees)" />
            <base-input v-model="currentItem.name" :icon="ViewfinderCircleIcon" label="Imię i nazwisko" />
            <base-input v-model="currentItem.email" type="email" :icon="AtSymbolIcon" label="Email" />

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

        <base-dialog :open="deleteDialog" title="Usuń wykładowcę" :icon="TrashIcon">
          <template #trigger>
            <base-button variant="danger" @click="handleDialogOpen('delete', cell.id)">
              Usuń
            </base-button>
          </template>

          <form @submit.prevent="handleDelete(currentItem, async() => await lecturers.delete(currentItem))">
            <DialogDescription class="text-base text-gray-700">
              Czy na pewno chcesz usunąć wykładowcę?
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
