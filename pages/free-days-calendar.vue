<script setup lang='ts'>
import { format, isEqual, isToday } from 'date-fns'
import { IconCalendarEvent, IconKey, IconTrash, IconUser } from '@tabler/icons-vue'

const offDays = useOffDays()
await offDays.getAll()

const {
  currentItem,
  createDialog,
  deleteDialog,
  handleCreate,
  handleDelete,
  handleDialogOpen,
  handleUpdate,
  isSubmitting,
  updateDialog,
} = useCrud(offDays.data)

const offDayTypes = [
  { value: 'Global', type: 'Global' },
  { value: 'Organization', type: 'Organization' },
  { value: 'Tenant', type: 'Tenant' },
  { value: 'Schedule', type: 'Schedule' },
  { value: 'Group', type: 'Group' },
]
</script>

<template>
  <div class="grid grid-rows- w-full items-center gap-4 border border-b-gray-200 px-12 py-9">
    <div>
      <h1 class="text-2xl font-bold leading-9 text-gray-900">
        Dni wolne od zajęć
      </h1>
    </div>

    <div class="flex gap-4">
      <base-button class="h-12" variant="primary" @click="handleDialogOpen('create')">
        Dodaj Dzień Wolny
      </base-button>
    </div>

    <div class="mb-8">
      <p class="mb-6 text-gray-700">
        Poniżej znajduje się kalendarz z zaznaczonymi dniami wolnymi od zajęć.
      </p>

      <div class="flex flex-col gap-2">
        <base-calendar>
          <template #default="{ date }">
            <div :class="[isToday(date) ? 'bg-indigo-300' : '']" class="text-center">
              {{ format(date, 'd') }}
            </div>

            <div v-for="offDay in offDays.data.filter(od => isEqual(new Date(od.date), date))" :key="offDay.id">
              <div :class="[offDay.scope === 'Global' ? 'bg-red-300' : '']" class="flex flex-wrap text-center">
                {{ offDay.reason }}

                <base-popover>
                  <div class="grid grid-flow-row justify-between grid-rows-1">
                    <base-button variant="primary" type="submit" label="Aktualizuj" @click="handleDialogOpen('update', offDay.id)">
                      Aktualizuj
                    </base-button>
                    <base-button variant="primary" type="submit" label="Usuń" @click="handleDialogOpen('delete', offDay.id)">
                      Usuń
                    </base-button>
                  </div>
                </base-popover>
              </div>
            </div>
          </template>
        </base-calendar>
      </div>
    </div>

    <layout-footer />
  </div>

  <base-dialog v-model="createDialog" title="Utwórz dzień wolny" :icon="IconUser">
    <form class="flex flex-col gap-4" @submit.prevent="handleCreate(currentItem, async() => await offDays.create(currentItem))">
      <base-input v-model="currentItem.reason" :icon="IconCalendarEvent" label="Nazwa" />
      <base-select v-model="currentItem.scope" :icon="IconCalendarEvent" label="Zasięg" :options="offDayTypes" />
      <base-input v-model="currentItem.date" type="date" :icon="IconCalendarEvent" label="Data rozpoczęcia semestru" />

      <base-input v-if="currentItem.scope === 'Organization'" v-model="currentItem.organizationId" :icon="IconUser" label="Id Organizacji" />
      <base-input v-else-if="currentItem.scope === 'Tenant'" v-model="currentItem.tenantId" :icon="IconUser" label="Id Tenantu" />
      <base-input v-else-if="currentItem.scope === 'Schedule'" v-model="currentItem.scheduleId" :icon="IconUser" label="Id Planu Zajęć" />
      <base-input v-else-if="currentItem.scope === 'Group'" v-model="currentItem.groupId" :icon="IconUser" label="Id Grupy" />

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

  <base-dialog v-model="updateDialog" title="Edytuj dzień wolny" :icon="IconUser">
    <form class="flex flex-col gap-4" @submit.prevent="handleUpdate(currentItem, async() => await offDays.update(currentItem))">
      <base-input v-model="currentItem.id" :icon="IconKey" label="ID" disabled />
      <base-input v-model="currentItem.reason" :icon="IconCalendarEvent" label="Nazwa" />
      <base-select v-model="currentItem.scope" :icon="IconCalendarEvent" label="Zasięg" :options="offDayTypes" />
      <base-input v-model="currentItem.date" type="date" :icon="IconCalendarEvent" label="Data rozpoczęcia semestru" />

      <base-input v-if="currentItem.scope === 'Organization'" v-model="currentItem.organizationId" :icon="IconUser" label="Id Organizacji" />
      <base-input v-else-if="currentItem.scope === 'Tenant'" v-model="currentItem.tenantId" :icon="IconUser" label="Id Tenantu" />
      <base-input v-else-if="currentItem.scope === 'Schedule'" v-model="currentItem.scheduleId" :icon="IconUser" label="Id Planu Zajęć" />
      <base-input v-else-if="currentItem.scope === 'Group'" v-model="currentItem.groupId" :icon="IconUser" label="Id Grupy" />

      <div class="mt-6 flex justify-end gap-4">
        <base-button variant="secondary" @click="updateDialog = false">
          Zamknij
        </base-button>
        <base-button variant="primary" type="submit" :disabled="isSubmitting" :loading="isSubmitting">
          Zapisz zmiany
        </base-button>
      </div>
    </form>
  </base-dialog>

  <base-dialog v-model="deleteDialog" title="Usuń dzień wolny" :icon="IconTrash">
    <p class="text-base text-gray-700">
      Czy na pewno chcesz usunąć dzień wolny?
    </p>

    <div class="mt-6 flex justify-end gap-4">
      <base-button variant="secondary" @click="deleteDialog = false">
        Zamknij
      </base-button>
      <base-button variant="danger" :disabled="isSubmitting" :loading="isSubmitting" @click="handleDelete(currentItem, async() => await offDays.delete(currentItem))">
        Usuń
      </base-button>
    </div>
  </base-dialog>
</template>
