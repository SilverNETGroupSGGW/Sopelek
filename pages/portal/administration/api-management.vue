<script setup lang="ts">
interface Endpoint {
  controller: string
  endpoint: string
}

const endpointsData: Endpoint[] = [
  // Tokens
  { controller: 'TokenController', endpoint: '[POST] api/login' },
  { controller: 'TokenController', endpoint: '[POST] api/tokens/refresh' },
  { controller: 'TokenController', endpoint: '[POST] api/tokens/revoke' },

  // Schedules
  { controller: 'ScheduleController', endpoint: '[GET] api/schedules' },
  { controller: 'ScheduleController', endpoint: '[GET] api/schedules/:id' },
  { controller: 'ScheduleController', endpoint: '[POST] api/schedules' },
  { controller: 'ScheduleController', endpoint: '[PUT] api/schedules/:id' },
  { controller: 'ScheduleController', endpoint: '[DELETE] api/schedules/:id' },
  { controller: 'ScheduleController', endpoint: '[GET] api/schedules/:id/extended' },
  { controller: 'ScheduleController', endpoint: '[GET] api/schedules/study-modes' },
  { controller: 'ScheduleController', endpoint: '[GET] api/schedules/degrees-of-studies' },

  // Users
  { controller: 'UserController', endpoint: '[GET] api/users' },
  { controller: 'UserController', endpoint: '[GET] api/users/:userId' },
  { controller: 'UserController', endpoint: '[POST] api/users' },
  { controller: 'UserController', endpoint: '[PUT] api/users' },
  { controller: 'UserController', endpoint: '[DELETE] api/users/:userId' },
  { controller: 'UserController', endpoint: '[POST] api/Users/:userId/change-tenant/:tenantId' },

  // UserRoles
  { controller: 'UserRolesController', endpoint: '[GET] api/UsersRoles/:userId' },
  { controller: 'UserRolesController', endpoint: '[POST] api/UsersRoles/assign' },
  { controller: 'UserRolesController', endpoint: '[POST] api/UsersRoles/assign-multiple' },
  { controller: 'UserRolesController', endpoint: '[DELETE] api/UsersRoles/remove' },
  { controller: 'UserRolesController', endpoint: '[DELETE] api/UsersRoles/remove-multiple' },
]

const selectedController = ref<string | null>('')
const selectedEndpoint = ref<string | null>('')

const controllers = computed(() => {
  return endpointsData.map(endpoint => endpoint.controller).reduce((array, controller) => {
    if (!array.includes(controller)) {
      array.push(controller)
    }
    return array
  }, [] as string[])
})

const endpoints = computed(() => {
  return endpointsData.filter(e => e.controller === selectedController.value).map(e => e.endpoint)
})

function handleEndpointComboboxChange(value: string) {
  selectedEndpoint.value = value
}

function handleControllerComboboxChange(value: string) {
  selectedController.value = value
  selectedEndpoint.value = null
}
</script>

<template>
  <div class="flex w-full flex-wrap items-start justify-between gap-6 border-b border-b-gray-200 px-12 py-9">
    <utils-header text="API Management " />
  </div>

  <div class="my-9 h-screen px-12">
    <div class="inline-flex columns-2 gap-10">
      <div>
        <h1 class="mb-4 text-xl font-bold text-gray-900">
          Controller:
        </h1>

        <div class="my-1 w-72">
          <base-combobox
            :options="controllers"
            :value="selectedController"
            @change="handleControllerComboboxChange"
          />
        </div>
      </div>

      <div>
        <h1 class="mb-4 text-xl font-bold text-gray-900">
          Endpoint:
        </h1>

        <div class="my-1 w-72">
          <base-combobox
            :options="endpoints"
            :value="selectedEndpoint"
            @change="handleEndpointComboboxChange"
          />
        </div>
      </div>
    </div>

    <!-- Tokens -->
    <api-view-tokens-login v-if="selectedEndpoint === '[POST] api/login'" class="my-9" />
    <api-view-tokens-refresh v-if="selectedEndpoint === '[POST] api/tokens/refresh'" class="my-9" />
    <api-view-tokens-revoke v-if="selectedEndpoint === '[POST] api/tokens/revoke'" class="my-9" />

    <!-- Schedules -->
    <api-view-schedules-get-all v-if="selectedEndpoint === '[GET] api/schedules'" class="my-9" />
    <api-view-schedules-get v-if="selectedEndpoint === '[GET] api/schedules/:id'" class="my-9" />
    <api-view-schedules-get-extended v-if="selectedEndpoint === '[GET] api/schedules/:id/extended'" class="my-9" />
    <api-view-schedules-post v-if="selectedEndpoint === '[POST] api/schedules'" class="my-9" />
    <api-view-schedules-put v-if="selectedEndpoint === '[PUT] api/schedules/:id'" class="my-9" />
    <api-view-schedules-delete v-if="selectedEndpoint === '[DELETE] api/schedules/:id'" class="my-9" />
    <api-view-schedules-get-study-modes v-if="selectedEndpoint === '[GET] api/schedules/study-modes'" class="my-9" />
    <api-view-schedules-get-degrees-of-studies v-if="selectedEndpoint === '[GET] api/schedules/degrees-of-studies'" class="my-9" />

    <!-- Users -->
    <api-view-users-get-all v-if="selectedEndpoint === '[GET] api/users'" class="my-9" />
    <api-view-users-get v-if="selectedEndpoint === '[GET] api/users/:userId'" class="my-9" />
    <api-view-users-post v-if="selectedEndpoint === '[POST] api/users'" class="my-9" />
    <api-view-users-put v-if="selectedEndpoint === '[PUT] api/users'" class="my-9" />
    <api-view-users-delete v-if="selectedEndpoint === '[DELETE] api/users/:userId'" class="my-9" />
    <api-view-users-post-change-tenant v-if="selectedEndpoint === '[POST] api/users/:userId/change-tenant/:tenantId'" class="my-9" />

    <!-- UserRoles -->
    <api-view-user-roles-get-user-roles v-if="selectedEndpoint === '[GET] api/UsersRoles/:userId'" class="my-9" />
    <api-view-user-roles-post-assign v-if="selectedEndpoint === '[POST] api/UsersRoles/assign'" class="my-9" />
    <api-view-user-roles-post-assign-multiple v-if="selectedEndpoint === '[POST] api/UsersRoles/assign-multiple'" class="my-9" />
    <api-view-user-roles-delete-remove v-if="selectedEndpoint === '[DELETE] api/UsersRoles/remove'" class="my-9" />
    <api-view-user-roles-delete-remove-multiple v-if="selectedEndpoint === '[DELETE] api/UsersRoles/remove-multiple'" class="my-9" />
  </div>
</template>
