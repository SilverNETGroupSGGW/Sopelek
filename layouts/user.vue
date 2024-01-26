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
  <div class="flex h-[100dvh] w-screen items-center justify-center bg-[url('~/assets/shapes.svg')] p-4">
    <slot />
  </div>

  <base-toast type="error" :show="!isOfetchEmpty" @close="resetOfetchStatus">
    <template v-if="ofetchStatus.request.endsWith('login') && ofetchStatus.status !== 200">
      <span class="text-sm font-medium text-gray-700">Niepoprawne dane logowania.</span>
    </template>
  </base-toast>
</template>
