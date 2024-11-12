<script lang="ts" setup>
import { IconTrash } from '@tabler/icons-vue'

const props = defineProps<{
  onCanceled: () => void
  onConfirmed: () => void
}>()

const isVisible = defineModel<boolean>()
const isLoading = ref(false)

async function handleConfirmDelete() {
  isLoading.value = true

  try {
    props.onConfirmed()

    // await subjects.delete(props.id)
  }
  catch {
  }
  finally {
    // scheduler.schedule!.subjects = scheduler.schedule!.subjects.filter(x => x.id !== props.id)
    isVisible.value = false
    isLoading.value = false
  }
}

async function handleCancelDelete() {
  isVisible.value = false
}
</script>

<template>
  <base-dialog
    v-model="isVisible"
    title="Usuń zajęcia"
    :icon="IconTrash"
  >
    <p class="text-base text-gray-700">
      Czy na pewno chcesz usunąć zajęcia?
    </p>

    <div class="mt-6 flex justify-end gap-4">
      <base-button
        variant="secondary"
        @click="handleCancelDelete"
      >
        Zamknij
      </base-button>
      <base-button
        variant="danger"
        :loading="isLoading"
        @click="handleConfirmDelete"
      >
        Usuń
      </base-button>
    </div>
  </base-dialog>
</template>
