<script setup lang="ts">
import { PhCalendarDots } from '@phosphor-icons/vue'
import type { DateValue } from '@internationalized/date'
import { DateFieldInput, DateFieldRoot, Label } from 'radix-vue'

defineProps<{
  caption?: string
  dense?: boolean
  disabled?: boolean
  icon?: /* FunctionalComponent */ any
  label?: string
  modelValue: string | number
  placeholder?: string
  type?: string
}>()

const id = useId()
const model = defineModel<DateValue>()
</script>

<template>
  <div class="relative flex flex-col">
    <Label v-if="label" :for="id" class="mb-1 font-medium text-gray-700">
      {{ label }}
    </Label>

    <div class="relative w-full">
      <PhCalendarDots class="absolute left-6 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 text-gray-700" />
      <DateFieldRoot :id="id" v-slot="{ segments }" v-model="model" class="flex h-12 w-full items-center self-stretch rounded-lg border border-gray-200 py-4 pr-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out placeholder:text-gray-400 hover:transition-all hover:duration-200 hover:ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:transition-all focus:duration-200 focus:ease-in-out active:ring-2 active:ring-indigo-600 disabled:bg-gray-100" :class="[icon ? 'pl-12' : 'pl-6']" locale="pl-PL">
        <template v-for="item in segments" :key="item.part">
          <DateFieldInput v-if="item.part === 'literal'" :part="item.part">
            {{ item.value }}
          </DateFieldInput>
          <DateFieldInput v-else :part="item.part">
            {{ item.value }}
          </DateFieldInput>
        </template>
      </DateFieldRoot>
    </div>

    <span v-if="caption" class="text-sm text-indigo-600">
      {{ caption }}
    </span>
  </div>
</template>
