<script setup lang="ts">
import { CalendarIcon, CloudIcon, MagnifyingGlassIcon, PencilIcon, UserIcon, ViewfinderCircleIcon } from '@heroicons/vue/24/solid'

const studyPlans = useStudyPlans()
await studyPlans.get()

const data = useData()

const { currentItem, createDialog, handleCreate, handleDialogOpen, isSubmitting, search, updateDialog } = useCrud(studyPlans.data)
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

      <base-dialog v-model="updateDialog" title="Utwórz plan studiów" :icon="UserIcon">
        <template #trigger>
          <base-button class="h-12" variant="primary" @click="handleDialogOpen('create')">
            Dodaj kierunek
          </base-button>
        </template>

        <form class="flex flex-col gap-4" @submit.prevent="handleCreate(currentItem, async() => await studyPlans.create(currentItem))">
          <base-input v-model="currentItem.start" :icon="CalendarIcon" label="Data rozpoczęcia" />
          <base-input v-model="currentItem.name" :icon="PencilIcon" label="Nazwa" />
          <base-input v-model="currentItem.field" :icon="ViewfinderCircleIcon" label="Kierunek" />
          <base-input v-model="currentItem.type" :icon="CloudIcon" label="Stopień studiów" />
          <base-select v-model="currentItem.mode" :icon="CloudIcon" label="Tryb studiów" :options="data.studyModes" />

          <div class="mt-6 flex justify-end gap-4">
            <base-button variant="secondary" @click="createDialog = false">
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
        <base-button variant="primary" @click="handleDialogOpen('update', cell.id)">
          Edytuj
        </base-button>

        <base-button variant="danger" @click="handleDialogOpen('delete', cell.id)">
          Usuń
        </base-button>
      </div>
    </template>
  </base-table>
</template>
