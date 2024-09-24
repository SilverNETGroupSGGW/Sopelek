<script setup lang="ts">
const controllers = ref<string[]>([
  '[POST] api/login',
  '[GET] api/schedules',
  '[GET] api/schedules/:id',
  '[POST] api/schedules',
  '[PUT] api/schedules/:id',
  '[DELETE] api/schedules/:id',
])

const selectedEndpoint = ref<string>('')

function handleComboboxChange(value: string) {
  selectedEndpoint.value = value
}
</script>

<template>
  <div class="flex w-full flex-wrap items-start justify-between gap-6 border-b border-b-gray-200 px-12 py-9">
    <utils-header text="API Management " />
  </div>

  <div class="my-9 h-screen px-12">
    <div class="my-3">
      <h1 class="mb-4 text-xl font-bold text-gray-900">
        Endpoint:
      </h1>
    </div>

    <div class="my-1 w-72">
      <base-combobox
        :options="controllers"
        @change="handleComboboxChange"
      />
    </div>

    <api-view-tokens-login v-if="selectedEndpoint === '[POST] api/login'" class="my-9" />

    <api-view-schedules-get-all v-if="selectedEndpoint === '[GET] api/schedules'" class="my-9" />
    <api-view-schedules-get v-if="selectedEndpoint === '[GET] api/schedules/:id'" class="my-9" />
    <api-view-schedules-post v-if="selectedEndpoint === '[POST] api/schedules'" class="my-9" />
    <api-view-schedules-put v-if="selectedEndpoint === '[PUT] api/schedules/:id'" class="my-9" />
    <api-view-schedules-delete v-if="selectedEndpoint === '[DELETE] api/schedules/:id'" class="my-9" />
  </div>
</template>
