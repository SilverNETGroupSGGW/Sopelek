<script setup lang="ts">
import { PhChalkboard, PhGridNine, PhHouseLine, PhListMagnifyingGlass, PhUser } from '@phosphor-icons/vue'
import type { Component } from 'vue'

const route = useRoute()

const tabs = reactive([
  {
    active: computed(() => route.path === '/'),
    icon: PhHouseLine,
    label: 'Strona główna',
    to: '/',
  },
  {
    active: computed(() => route.path === '/study-plans'),
    icon: PhListMagnifyingGlass,
    label: 'Programy studiów',
    to: '/study-plans',
  },
  {
    active: computed(() => route.path.startsWith('/schedules')),
    icon: PhGridNine,
    label: 'Plany zajęć',
    to: '/schedules',
  },
  {
    active: computed(() => route.path === '/lecturers'),
    icon: PhUser,
    label: 'Wykładowcy',
    to: '/lecturers',
  },
  {
    active: computed(() => route.path === '/classrooms'),
    icon: PhChalkboard,
    label: 'Sale',
    to: '/classrooms',
  },
]) satisfies Array<{
  active: boolean
  icon: Component
  label: string
  to: string
}>
</script>

<template>
  <aside class="h-screen bg-indigo-600 p-9">
    <base-logo class="mb-9" />
    <ul>
      <li v-for="tab in tabs" :key="tab.label" class="group mb-2 group-hover:mb-4">
        <base-tab v-bind="tab" />
      </li>
    </ul>
  </aside>
</template>
