<script setup lang="ts" generic="T extends { value: string }">
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'

defineProps<{
  options: T[]
  icon?: /* FunctionalComponent */ any
  label?: string
  caption?: string
}>()

const modelValue = defineModel<string>()
</script>

<template>
  <div class="relative flex flex-col">
    <Listbox v-model="modelValue">
      <ListboxLabel v-if="label" class="mb-1 font-medium text-gray-700">
        {{ label }}
      </ListboxLabel>
      <div class="relative h-full">
        <ListboxButton class="relative flex h-12 w-full flex-col items-start justify-center self-stretch rounded-lg border border-gray-300 py-4 pr-6 text-gray-700 transition-colors duration-200 ease-in-out placeholder:text-gray-400 hover:transition-all hover:duration-200 hover:ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:transition-all focus:duration-200 focus:ease-in-out active:ring-2 active:ring-indigo-600 disabled:bg-gray-100" v-bind="$attrs" :class="[icon ? 'pl-12' : 'pl-6']">
          <span class="block">{{ modelValue }}</span>
          <component :is="icon" v-if="icon" class="absolute left-6 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
        </ListboxButton>

        <Transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <ListboxOptions class="absolute z-10 mt-4 max-h-40 w-full overflow-auto rounded-lg border border-gray-200 bg-white px-1 py-2 text-base shadow-lg focus:outline-none">
            <ListboxOption v-for="(option, index) in options" :key="index" v-slot="{ active }" as="template" :value="option.value">
              <li class="relative cursor-default select-none rounded-lg px-5 py-2" :class="{ 'bg-indigo-600 text-white': active, 'text-gray-900': !active }">
                <slot v-if="$slots.options" name="options" :option="option" :active="active" />
                <span v-else class="block truncate">{{ option.value }}</span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  </div>
</template>
