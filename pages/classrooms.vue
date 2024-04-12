<script setup lang="ts">
import { MagnifyingGlassIcon, TrashIcon, UserIcon, ViewfinderCircleIcon } from '@heroicons/vue/24/solid'
import { DialogClose, DialogDescription } from 'radix-vue'

// Supabase
const classrooms = useClassrooms()
await classrooms.get()

// Utils
const { currentItem, createDialog, deleteDialog, handleCreate, handleDelete, handleDialogOpen, handleUpdate, isSubmitting, search, updateDialog } = useCrud(classrooms.data)
</script>

<template>
  <div class="flex w-full flex-wrap items-center justify-between gap-4 border-b bg-gray-50 px-12 py-4">
    <h1 class="text-2xl font-bold leading-9 text-gray-950">
      Sale
    </h1>

    <div class="flex items-center gap-4">
      <base-input v-model="search" placeholder="Szukaj" class="w-96" :icon="MagnifyingGlassIcon" />

      <base-dialog :open="createDialog" title="Utwórz salę" :icon="UserIcon" @update:open="createDialog = $event">
        <template #trigger>
          <base-button class="h-12" variant="primary" @click="handleDialogOpen('create')">
            Dodaj salę
          </base-button>
        </template>

        <form class="flex flex-col gap-4" @submit.prevent="handleCreate(currentItem, async() => await classrooms.create(currentItem))">
          <base-input v-model="currentItem.building" :icon="ViewfinderCircleIcon" label="Budynek" />
          <base-input v-model.number="currentItem.floor" :icon="ViewfinderCircleIcon" label="Piętro" type="number" />
          <base-input v-model="currentItem.name" :icon="ViewfinderCircleIcon" label="Nazwa sali" />
          <base-input v-model.number="currentItem.capacity" :icon="ViewfinderCircleIcon" label="Pojemność" type="number" />
          <base-input v-model="currentItem.type" :icon="ViewfinderCircleIcon" label="Typ sali" />

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

  <base-table :search="search" :data="classrooms.data" :columns="classrooms.columns">
    <template #name="{ cell }">
      <span class="text-base font-medium text-gray-900">{{ cell.name }}</span>
      <br>
      <span class="text-sm text-gray-600">Budynek {{ cell.building }}, piętro {{ cell.floor }}</span>
      <br>
      <span class="text-sm text-gray-600">{{ cell.type }}</span>
    </template>

    <template #actions="{ cell }">
      <div class="flex gap-4">
        <base-dialog :open="updateDialog" title="Edytuj salę" :icon="UserIcon" @update:open="updateDialog = $event">
          <template #trigger>
            <base-button variant="primary" @click="handleDialogOpen('update', cell.id)">
              Edytuj
            </base-button>
          </template>

          <form class="flex flex-col gap-4" @submit.prevent="handleUpdate(currentItem, async() => await classrooms.update(currentItem))">
            <base-input v-model="currentItem.building" :icon="ViewfinderCircleIcon" label="Budynek" />
            <base-input v-model.number="currentItem.floor" :icon="ViewfinderCircleIcon" label="Piętro" type="number" />
            <base-input v-model="currentItem.name" :icon="ViewfinderCircleIcon" label="Nazwa sali" />
            <base-input v-model.number="currentItem.capacity" :icon="ViewfinderCircleIcon" label="Pojemność" type="number" />
            <base-input v-model="currentItem.type" :icon="ViewfinderCircleIcon" label="Typ sali" />

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

        <base-dialog :open="deleteDialog" title="Usuń salę" :icon="TrashIcon" @update:open="deleteDialog = $event">
          <template #trigger>
            <base-button variant="danger" @click="handleDialogOpen('delete', cell.id)">
              Usuń
            </base-button>
          </template>

          <form @submit.prevent="handleDelete(currentItem, async() => await classrooms.delete(currentItem))">
            <DialogDescription class="text-base text-gray-700">
              Czy na pewno chcesz usunąć salę?
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
