<script setup lang="ts" generic="T extends object">
import { Combobox, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions, TransitionRoot } from '@headlessui/vue'

const props = defineProps<{
  caption?: string
  icon?: any // FunctionalComponent
  label?: string
  currentItem?: T | null
  options: T[]
  suggestionsCount?: number
  onItemSelected?: (item: T) => void // Function is called when an item is selected
  onItemFiltered?: (item: T, query: string) => boolean // Implement this function to specify how to filter the options
  onItemRendered?: (item: T) => string // Implement this function to specify how to write object to string
}>()

const currentItem = ref<T | null>(props.currentItem ?? null) as unknown as Ref<T | null>
const query = ref<string>('')

const suggestionsCount = ref(props.suggestionsCount ?? 10)
watch(() => props.options, () => {
  suggestionsCount.value = props.suggestionsCount ?? 10
})

watch(currentItem, (newValue) => {
  if (newValue) {
    query.value = props.onItemRendered
      ? props.onItemRendered(newValue)
      : (newValue as any).value
  }

  if (newValue) {
    if (props.onItemSelected) {
      props.onItemSelected(newValue)
    }
  }
})

const filteredOptions = computed(() => {
  return props.options.filter((option) => {
    if (props.onItemFiltered) { // If onItemFiltered is provided, use it to filter the options
      return props.onItemFiltered(option, query.value)
    }
    else if ((option as any).value) { // If option is an object, use its value property to filter
      return (option as any).value.toLowerCase().startsWith(query.value.toLowerCase())
    }
    else if (typeof option === 'string') { // If option is a string, use it to filter
      return (option as string).toLowerCase().startsWith(query.value.toLowerCase())
    }

    return true
  }).slice(0, suggestionsCount.value)
})

function renderInputDisplayValue(option: T): string {
  if (!option) {
    return ''
  }

  return props.onItemRendered
    ? props.onItemRendered(option)
    : (option as any).value
}
</script>

<template>
  <div class="relative flex flex-col">
    <Combobox
      v-model="currentItem"
      as="div"
      data-v-inspector
      nullable
    >
      <ComboboxLabel v-if="label" class="mb-1 font-medium text-gray-700">
        {{ label }}
      </ComboboxLabel>

      <div class="relative h-full">
        <component
          :is="icon"
          v-if="icon"
          class="absolute left-6 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 text-gray-400"
        />

        <ComboboxInput
          class="flex h-12 w-full flex-col items-start justify-center self-stretch rounded-lg border border-gray-300 py-4 pr-6 text-gray-700 transition-colors duration-200 ease-in-out placeholder:text-gray-400 hover:transition-all hover:duration-200 hover:ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:transition-all focus:duration-200 focus:ease-in-out active:ring-2 active:ring-indigo-600 disabled:bg-gray-100"
          v-bind="$attrs"
          :class="[icon ? 'pl-12' : 'pl-6']"
          :display-value="() => renderInputDisplayValue(currentItem as T)"
          @change="query = $event.target.value;"
        />

        <div
          v-if="!currentItem && !query"
          class="pointer-events-none absolute top-3 w-full px-6 py-0 font-medium text-gray-500 opacity-50"
          :class="[
            !icon ? 'left-0' : 'left-6',
          ]"
        >
          {{ !caption ? 'Put value to search' : caption }}
        </div>

        <TransitionRoot
          leave="transition ease-in duration-100"
          leave-from="opacity-100"
          leave-to="opacity-0"
          @after-leave="query = ''"
        >
          <div
            v-if="!filteredOptions.length"
            class="absolute z-10 mt-4 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white px-1 py-2 text-base shadow-lg focus:outline-none"
          >
            <div class="relative cursor-default select-none rounded-lg px-5 py-2 text-gray-900">
              <span class="block truncate">Nie znaleziono wyników</span>
            </div>
          </div>

          <ComboboxOptions
            v-else
            class="absolute z-10 mt-4 max-h-96 w-full overflow-auto rounded-lg border border-gray-200 bg-white px-1 py-2 text-base shadow-lg focus:outline-none"
          >
            <ComboboxOption
              v-for="(option, index) in filteredOptions"
              :key="index"
              v-slot="{ active }"
              as="template"
              :value="option"
            >
              <li
                class="relative cursor-pointer select-none rounded-lg px-5 py-2"
                :class="{
                  'bg-indigo-600 text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <slot
                  v-if="$slots.options"
                  name="options"
                  :option="option"
                  :active="active"
                />
                <span
                  v-else
                  class="block truncate"
                >
                  {{
                    props.onItemRendered
                      ? props.onItemRendered(option)
                      : (option as any).value
                  }}
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>
