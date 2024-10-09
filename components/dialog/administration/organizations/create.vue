<script setup lang="ts">
import { IconUser } from '@tabler/icons-vue'
import type { Organization } from '~/types'

defineProps({
  currentItem: Object,
  isSubmitting: Boolean,
  handleCreate: Function,
})

const organizations = useOrganizations()

const isDialogVisible = ref<boolean>(false)
const dialogItemModel = ref<Organization>({
  id: '',
  name: '',
  created: new Date(),
  updated: new Date(),
})

async function handleDialogSave() {
  await organizations.create(dialogItemModel.value)
}

function handleDialogCancel() {
  isDialogVisible.value = false
}
</script>

<template>
  <base-dialog
    v-model="isDialogVisible"
    title="Dodaj organizację"
    :icon="IconUser"
  >
    <form
      class="flex flex-col gap-4"
      @submit.prevent="handleDialogSave"
    >
      <base-input v-model="dialogItemModel.name" :icon="IconUser" label="Nazwa" />

      <div class="mt-6 flex justify-end gap-4">
        <base-button
          variant="secondary"
          type="button"
          @click="handleDialogCancel"
        >
          Zamknij
        </base-button>
        <base-button
          variant="primary"
          type="submit"
          :disabled="isSubmitting"
          :loading="isSubmitting"
        >
          Zapisz zmiany
        </base-button>
      </div>
    </form>
  </base-dialog>
</template>
