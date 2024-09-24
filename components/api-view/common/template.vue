<script setup lang="ts">
import { useApiViewSettings } from '~/stores/api-view/useApiViewSettings'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

const params = defineProps<{
  method: string
  endpoint: string
  response?: ApiResponse<any> | null
  rawResponse?: any | null
  onExecute: () => Promise<void>
  onClear: () => Promise<void>
}>()

const apiViewSettings = useApiViewSettings()

const isLoading = ref<boolean>(false)
const unwrapRequest = ref<boolean>(apiViewSettings.unwrapRequest)
const formatResponseData = ref<boolean>(apiViewSettings.formatResponseData)

async function handleExecute() {
  isLoading.value = true
  await params.onExecute()
  isLoading.value = false
}

async function handleClear() {
  await params.onClear()
  isLoading.value = false
}

function getStatusBgColor(status: number | undefined) {
  if (!status) { return '' }
  if (status >= 200 && status < 300) { return 'bg-green-300' }
  return 'bg-red-300'
}

function handleUnwrapRequestChange() {
  apiViewSettings.unwrapRequest = unwrapRequest.value
}

function handleFormatResponseDataChange() {
  apiViewSettings.formatResponseData = formatResponseData.value
}
</script>

<template>
  <div>
    <h1 class="mb-4 text-xl font-bold text-gray-900">
      {{ params.method }} {{ params.endpoint }}
    </h1>

    <h2 class="mb-4 font-bold text-gray-900">
      Parametry:
    </h2>

    <slot />

    <h2 class="mb-4 font-bold text-gray-900">
      Opcje:
    </h2>

    <base-checkbox
      v-model="unwrapRequest"
      label="Rozpakuj odpowiedź"
      @change="handleUnwrapRequestChange"
    />

    <base-checkbox
      v-model="formatResponseData"
      label="Formatuj odpowiedź"
      @change="handleFormatResponseDataChange"
    />

    <base-button
      class="my-9 inline-flex w-36 rounded-none rounded-l-lg"
      variant="primary"
      @click="handleExecute"
    >
      Wykonaj
    </base-button>

    <base-button
      class="my-9 inline-flex w-36 rounded-none rounded-r-lg border-l"
      variant="danger"
      @click="handleClear"
    >
      Wyczyść
    </base-button>

    <div>
      <div class="inline-flex">
        Status code: &nbsp;
      </div>
      <div :class="`inline-flex p-1 rounded-lg ${getStatusBgColor(params.response?.status)}`">
        {{ params.response?.status }}
      </div>
    </div>

    <div v-if="params.response?.hasError">
      <div class="inline-flex">
        Has error: &nbsp;
      </div>
      <div class="inline-flex rounded-lg p-1">
        {{ params.response?.hasError }}
      </div>
    </div>

    <div v-if="params.response?.hasError">
      <div class="inline-flex">
        Error message: &nbsp;
      </div>
      <div class="inline-flex rounded-lg p-1">
        {{ params.response?.errorMessage }}
      </div>
    </div>

    <div v-if="params.response?.timestamp">
      <div class="inline-flex">
        Timestamp: &nbsp;
      </div>
      <div class="inline-flex rounded-lg p-1">
        {{ params.response?.timestamp }}
      </div>
    </div>

    <h2 class="my-4 font-bold text-gray-900">
      Response:
    </h2>

    <div class="my-3 w-full justify-center bg-gray-100 p-3">
      <div v-if="params.response">
        <div v-if="unwrapRequest">
          <div v-if="formatResponseData">
            <pre class="text-balance break-words">{{ JSON.stringify(params.response.data, null, 2) }}</pre>
          </div>
          <div v-else>
            {{ JSON.stringify(params.response.data, null, 2) }}
          </div>
        </div>
        <div v-else>
          <div v-if="formatResponseData">
            <pre class="text-balance break-words">{{ JSON.stringify(params.response, null, 2) }}</pre>
          </div>
          <div v-else>
            {{ JSON.stringify(params.response, null, 2) }}
          </div>
        </div>
      </div>
      <div v-else-if="params.rawResponse">
        <div v-if="formatResponseData">
          <pre class="text-balance break-words">{{ JSON.stringify(params.rawResponse, null, 2) }}</pre>
        </div>
        <div v-else class="text-balance break-words">
          {{ JSON.stringify(params.rawResponse, null, 2) }}
        </div>
      </div>
      <div v-else-if="isLoading">
        <base-spinner />
      </div>
      <div v-else>
        <p>Brak danych</p>
      </div>
    </div>
  </div>
</template>
