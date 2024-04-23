<script setup lang="ts">
import { IconChalkboard, IconChartArrows, IconHome, IconTableColumn, IconUser, IconBrandTabler, IconUsersGroup } from '@tabler/icons-vue'

const route = useRoute()

const tabs = reactive([
  {
    icon: IconHome,
    label: 'Strona główna',
    to: '/',
    active: computed(() => route.path === '/'),
  },
  {
    icon: IconBrandTabler,
    label: 'Panel Administracyjny',
    to: '/administration',
    active: computed(() => route.path.startsWith('/administration')),
    requiredRole: 'SystemAdministrator',
  },
  {
    icon: IconChartArrows,
    label: 'Kierunki studiów',
    to: '/study-programs',
    active: computed(() => route.path === '/study-programs'),
  },
  {
    icon: IconTableColumn,
    label: 'Plany zajęć',
    to: '/schedules',
    active: computed(() => route.path.startsWith('/schedules')),
  },
  {
    icon: IconUsersGroup,
    label: 'Wykładowcy',
    to: '/lecturers',
    active: computed(() => route.path === '/lecturers'),
  },
  {
    icon: IconChalkboard,
    label: 'Sale',
    to: '/classrooms',
    active: computed(() => route.path === '/classrooms'),
  },
  {
    icon: IconUser,
    label: 'Użytkownicy',
    to: '/user',
    active: computed(() => route.path === '/user'),
    onClick: async () => {
      useCookie('accessToken').value = null
      useCookie('refreshToken').value = null
      await navigateTo({ path: '/signin' })
    },
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
