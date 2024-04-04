<script setup lang="ts">
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radix-vue'

defineProps<{
  caption?: string
  icon?: /* FunctionalComponent */ any
  label?: string
  options: string[]
  placeholder?: string
}>()

const model = defineModel<string>()
</script>

<template>
  <SelectRoot v-model="model">
    <SelectLabel v-if="label" class="mb-1 font-medium text-gray-700">
      {{ label }}
    </SelectLabel>

    <SelectTrigger class="relative flex h-12 w-full items-center justify-between rounded-lg border border-gray-200 py-4 pl-12 pr-3 text-gray-700 transition-colors duration-200 ease-in-out placeholder:text-gray-400 hover:transition-all hover:duration-200 hover:ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:transition-all focus:duration-200 focus:ease-in-out active:ring-2 active:ring-indigo-600 disabled:bg-gray-100">
      <SelectValue>
        <component :is="icon" v-if="icon" class="absolute left-6 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 text-gray-400" />

        <span v-if="model" class="block">{{ model }}</span>
        <span v-else class="block text-gray-400">{{ placeholder }}</span>
      </SelectValue>
    </SelectTrigger>

    <SelectPortal>
      <SelectContent class="absolute z-10 mt-4 max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)] overflow-auto rounded-lg border border-gray-200 bg-white px-1 py-2 text-base shadow-lg focus:outline-none" position="popper" :side-offset="2">
        <SelectViewport>
          <SelectGroup>
            <SelectItem v-for="(option, index) in options" :key="index" :value="option" class="relative mt-1 cursor-pointer select-none rounded-lg bg-white px-5 py-2 text-gray-900 data-[highlighted]:bg-indigo-600 data-[highlighted]:text-white">
              <SelectItemText class="block truncate">
                {{ option }}
              </SelectItemText>
            </SelectItem>
          </SelectGroup>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
