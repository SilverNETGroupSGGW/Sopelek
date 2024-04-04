<script setup lang="ts">
import { CalendarIcon, ChartBarIcon, MagnifyingGlassIcon, TrashIcon, UserIcon, ViewfinderCircleIcon } from '@heroicons/vue/24/solid'
import { DialogClose, DialogDescription } from 'radix-vue'

const route = useRoute()

// Supabase
const schedules = useSchedules()
await schedules.get(Number.parseInt(route.params.id as string))

// Utils
const { currentItem, createDialog, deleteDialog, handleCreate, handleDelete, handleDialogOpen, handleUpdate, isSubmitting, search, updateDialog } = useCrud(schedules.data)
</script>

<template>
  <div class="flex w-full flex-wrap items-center justify-between gap-4 border-b bg-gray-50 px-12 py-4">
    <h1 class="text-2xl font-bold leading-9 text-gray-950">
      Plany zajęć
    </h1>

    <div class="flex items-center gap-4">
      <base-input v-model="search" placeholder="Szukaj" class="w-96" :icon="MagnifyingGlassIcon" />

      <base-dialog :open="createDialog" title="Utwórz plan zajęć" :icon="UserIcon">
        <template #trigger>
          <base-button class="h-12" variant="primary" @click="handleDialogOpen('create')">
            Dodaj plan zajęć
          </base-button>
        </template>

        <form class="flex flex-col gap-4" @submit.prevent="handleCreate(currentItem, async() => await schedules.create(currentItem, Number.parseInt(route.query.id as string)))">
          <base-input v-model="currentItem.start" :icon="CalendarIcon" label="Data rozpoczęcia" />
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

  <base-table :search="search" :data="schedules.data" :columns="schedules.columns">
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
            <base-input v-model="currentItem.start" :icon="CalendarIcon" label="Data rozpoczęcia" />
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
