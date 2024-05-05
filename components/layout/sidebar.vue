<script setup lang="ts">
import { IconCalendar, IconChalkboard, IconChartArrows, IconHome, IconLogout, IconTableColumn, IconTerminal2, IconUser, IconUsersGroup } from '@tabler/icons-vue'

const route = useRoute()

const tabs = reactive([
  {
    icon: IconHome,
    label: 'Strona główna',
    to: '/',
    active: computed(() => route.path === '/'),
  },
  {
    icon: IconTerminal2,
    label: 'Globalny panel administracyjny',
    to: '/administration',
    active: computed(() => route.path.startsWith('/administration')),
    requiredRole: 'SystemAdministrator',
  },
  {
    icon: IconSquareKey,
    label: 'Panel Administracyjny',
    to: '/tenant-administration',
    active: computed(() => route.path.startsWith('/tenant-administration')),
    requiredRole: 'TenantAdministrator',
  },
  {
    icon: IconChartArrows,
    label: 'Kierunki studiów',
    to: '/study-programs',
    active: computed(() => route.path === '/study-programs'),
  },
  {
    icon: IconCalendar,
    label: 'Kalendarz dni wolnych od zajęć',
    to: '/free-days-calendar',
    active: computed(() => route.path === '/free-days-calendar'),
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
  },
  {
    icon: IconLogout,
    label: 'Wyloguj',
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
