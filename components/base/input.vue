<script setup lang="ts">
withDefaults(defineProps<{
  caption?: string
  dense?: boolean
  disabled?: boolean
  icon?: /* FunctionalComponent */ any
  autocomplete?: string
  label?: string
  modelValue: string | number
  placeholder?: string
  type?: string
  multiline?: boolean
  multilineRowsHeight?: number
}>(), {
  type: 'text',
})

const model = defineModel<string | number | readonly string[] | null | undefined | (string | null)>()
</script>

<template>
  <div class="relative flex flex-col" v-bind="$attrs">
    <label v-if="label" class="mb-1 font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="relative w-full">
      <component :is="icon" v-if="icon && !multiline" class="absolute left-6 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
      <input
        v-if="!multiline"
        v-model="model"
        :disabled="disabled"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :type="type"
        class="flex h-12 w-full justify-center self-stretch rounded-lg border border-gray-200 py-4 pr-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out placeholder:text-gray-400 hover:transition-all hover:duration-200 hover:ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:transition-all focus:duration-200 focus:ease-in-out active:ring-2 active:ring-indigo-600 disabled:bg-gray-100"
        :class="[
          icon ? 'pl-12' : 'pl-6',
          type === 'date' || type === 'datetime-local' ? 'flex-row items-center' : 'flex-col items-start',
        ]"
      >
      <textarea
        v-else
        v-model="model"
        :disabled="disabled"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :rows="multilineRowsHeight"
        class="flex w-full resize justify-center self-stretch rounded-lg border border-gray-200 p-2 pr-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out placeholder:text-gray-400 hover:transition-all hover:duration-200 hover:ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:transition-all focus:duration-200 focus:ease-in-out active:ring-2 active:ring-indigo-600 disabled:bg-gray-100"
      />
    </div>
    <label v-if="caption" class="text-sm text-indigo-600">
      {{ caption }}
    </label>
  </div>
</template>
