<script setup lang="ts">
import { ClipboardDocumentCheckIcon, HomeIcon, PresentationChartBarIcon, RectangleGroupIcon, UserIcon } from '@heroicons/vue/24/outline'

const route = useRoute()

const tabs = reactive([
  {
    icon: HomeIcon,
    label: 'Strona główna',
    to: '/',
    active: computed(() => route.path === '/'),
  },
  {
    icon: ClipboardDocumentCheckIcon,
    label: 'Kierunki studiów',
    to: '/study-programs',
    active: computed(() => route.path === '/study-programs'),
  },
  {
    icon: RectangleGroupIcon,
    label: 'Plany zajęć',
    to: '/schedules',
    active: computed(() => route.path.startsWith('/schedules')),
  },
  {
    icon: UserIcon,
    label: 'Wykładowcy',
    to: '/lecturers',
    active: computed(() => route.path === '/lecturers'),
  },
  {
    icon: PresentationChartBarIcon,
    label: 'Sale',
    to: '/classrooms',
    active: computed(() => route.path === '/classrooms'),
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
