<script setup lang="ts">
defineProps<{
  modelValue: string | number
  icon?: /* FunctionalComponent */ any
  label?: string
  caption?: string
  dense?: boolean

  disabled?: boolean
  type?: string
  placeholder?: string
}>()

const model = defineModel()
</script>

<template>
  <div class="relative flex flex-col" v-bind="$attrs">
    <label v-if="label" class="mb-1 font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="relative w-full">
      <component :is="icon" v-if="icon" class="absolute left-6 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
      <input
        v-model="model"
        :disabled="disabled"
        :placeholder="placeholder"
        :type="type"
        class="flex h-12 w-full flex-col items-start justify-center self-stretch rounded-lg border-gray-200 py-4 pr-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out placeholder:text-gray-400 hover:transition-all hover:duration-200 hover:ease-in-out focus:border-transparent focus:outline-none focus:transition-all focus:duration-200 focus:ease-in-out disabled:bg-gray-100"
        :class="[
          icon && !dense ? 'pl-12' : !icon && dense ? 'pl-0' : !icon && !dense ? 'pl-6' : '',
          dense ? 'rounded-none border-b-2 pl-0 focus:border-b-indigo-600' : 'border',
          dense ? '' : 'focus:ring-2 focus:ring-indigo-600 active:ring-2 active:ring-indigo-600',
        ]"
      >
    </div>
    <label v-if="caption" class="text-sm text-indigo-600">
      {{ caption }}
    </label>
  </div>
</template>
