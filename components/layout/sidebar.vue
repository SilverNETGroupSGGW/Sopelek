<script setup lang="ts">
import { PresentationChartBarIcon, RectangleGroupIcon, UserIcon } from '@heroicons/vue/24/outline'

const tabs = reactive([
  {
    icon: RectangleGroupIcon,
    label: 'Plany zajęć',
    to: '/',
  },
  {
    icon: UserIcon,
    label: 'Wykładowcy',
    to: '/lecturers',
  },
  {
    icon: PresentationChartBarIcon,
    label: 'Sale',
    to: '/classrooms',
  },
])
</script>

<template>
  <aside class="h-screen border-r bg-indigo-600 p-9">
    <logo class="mb-9" />
    <ul>
      <li v-for="tab in tabs" :key="tab.label" class="group mb-2 group-hover:mb-4">
        <base-tab v-bind="tab" />
      </li>
    </ul>
  </aside>
</template>
