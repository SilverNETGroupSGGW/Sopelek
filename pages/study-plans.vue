<script setup lang="ts">
const studyPlans = useStudyPlans()
await studyPlans.get()

const { handleDialogOpen, search } = useCrud(studyPlans.data)
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
