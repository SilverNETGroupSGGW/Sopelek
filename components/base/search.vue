<script setup lang="ts" generic="T extends { value: string }">
import { Combobox, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions, TransitionRoot } from '@headlessui/vue'

const props = defineProps<{
  options: T[]
  icon?: /* FunctionalComponent */ any
  label?: string
  caption?: string
  modelValue?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const query = ref('')

const filteredOptions = computed(() => {
  return props.options.filter((option) => {
    if (!query.value)
      return true

    return option.value.toLowerCase().startsWith(query.value.toLowerCase())
  }).slice(0, 3)
})
</script>

<template>
  <div class="relative flex flex-col">
    <Combobox :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
      <ComboboxLabel v-if="label" class="mb-1 font-medium text-gray-700">
        {{ label }}
      </ComboboxLabel>
      <div class="relative h-full">
        <component :is="icon" v-if="icon" class="absolute left-6 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
        <ComboboxInput class="flex h-12 w-full flex-col items-start justify-center self-stretch rounded-lg border border-gray-300 py-4 pr-6 text-gray-700 transition-colors duration-200 ease-in-out placeholder:text-gray-400 hover:transition-all hover:duration-200 hover:ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:transition-all focus:duration-200 focus:ease-in-out active:ring-2 active:ring-indigo-600 disabled:bg-gray-100" v-bind="$attrs" :class="[icon ? 'pl-12' : 'pl-6']" @change="query = $event.target.value" />

        <TransitionRoot leave="transition ease-in duration-100" leave-from="opacity-100" leave-to="opacity-0" @after-leave="query = ''">
          <div v-if="!filteredOptions.length" class="absolute z-10 mt-4 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white px-1 py-2 text-base shadow-lg focus:outline-none">
            <div class="relative cursor-default select-none rounded-lg px-5 py-2 text-gray-900">
              <span class="block truncate">Nie znaleziono wyników</span>
            </div>
          </div>

          <ComboboxOptions v-else class="absolute z-10 mt-4 max-h-96 w-full overflow-auto rounded-lg border border-gray-200 bg-white px-1 py-2 text-base shadow-lg focus:outline-none">
            <ComboboxOption v-for="(option, index) in filteredOptions" :key="index" v-slot="{ active }" as="template" :value="option.value">
              <li class="relative cursor-default select-none rounded-lg px-5 py-2" :class="{ 'bg-indigo-600 text-white': active, 'text-gray-900': !active }">
                <slot v-if="$slots.options" name="options" :option="option" :active="active" />
                <span v-else class="block truncate">{{ option.value }}</span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>
