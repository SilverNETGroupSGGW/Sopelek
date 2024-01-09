<script setup lang="ts">
import { Bars3CenterLeftIcon, ChatBubbleOvalLeftEllipsisIcon, UserIcon } from '@heroicons/vue/24/outline'

const tabs = reactive([
  {
    icon: Bars3CenterLeftIcon,
    label: 'Plany zajęć',
    to: '/schedules',
  },
  {
    icon: UserIcon,
    label: 'Wykładowcy',
    to: '/lecturers',
  },
  {
    icon: ChatBubbleOvalLeftEllipsisIcon,
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
