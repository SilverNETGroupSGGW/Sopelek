<script setup lang="ts">
import { Tab, TabGroup, TabList } from '@headlessui/vue'

const props = defineProps<{
  selectedDay: string
  onDayChange: (day: string) => void
}>()

const { daysOfWeek } = useData()
const tabIndex = ref(daysOfWeek.findIndex(day => day.value === props.selectedDay))

function handleTabChange(index: number) {
  tabIndex.value = index
  props.onDayChange(daysOfWeek[index].value)
}
</script>

<template>
  <TabGroup
    :selected-index="tabIndex"
    @change="handleTabChange"
  >
    <TabList class="flex w-full">
      <Tab
        v-for="(day, index) in daysOfWeek"
        :key="index"
        v-slot="{ selected }"
        as="template"
      >
        <base-button
          :class="{
            'rounded-none': index !== 0 && index !== daysOfWeek.length - 1,
            'rounded-r-none': index === 0,
            'rounded-l-none': index === daysOfWeek.length - 1,
          }"
          :variant="selected ? 'primary' : 'secondary'"
        >
          {{ day.label }}
        </base-button>
      </Tab>
    </TabList>
  </TabGroup>
</template>
