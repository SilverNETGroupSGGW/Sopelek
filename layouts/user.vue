<script setup lang="ts">
import { useOfetchStatus } from '~/plugins/ofetch'

// Ofetch
const ofetchStatus = useOfetchStatus()

function resetOfetchStatus() {
  ofetchStatus.value.request = ''
  ofetchStatus.value.status = 0
  ofetchStatus.value.method = ''
}

const isOfetchEmpty = computed(() => {
  return ofetchStatus.value.request === '' && ofetchStatus.value.status === 0 && ofetchStatus.value.method === ''
})
</script>

<template>
  <div class="flex h-screen w-screen">
    <div class="h-full w-1/3">
      <slot />
    </div>
    <div class="w-2/3 bg-indigo-600" />
  </div>

  <base-toast type="error" :show="!isOfetchEmpty" @close="resetOfetchStatus">
    <template v-if="ofetchStatus.request.endsWith('login') && ofetchStatus.status !== 200">
      <span class="text-sm font-medium text-gray-700">Niepoprawne dane logowania.</span>
    </template>
  </base-toast>
</template>