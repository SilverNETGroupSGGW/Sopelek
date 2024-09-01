<script setup lang="ts">
import { IconCalendar, IconChalkboard, IconChartArrows, IconHome, IconLogout, IconSquareKey, IconTableColumn, IconTerminal2, IconUser, IconUsersGroup } from '@tabler/icons-vue'

const route = useRoute()

const account = useAccount()
await account.get()

const tabs = reactive([
  {
    icon: IconHome,
    label: 'Strona główna',
    to: '/portal/',
    active: computed(() => route.path === '/portal/'),
  },
  {
    icon: IconTerminal2,
    label: 'Globalny panel administracyjny',
    to: '/portal/administration',
    active: computed(() => route.path.startsWith('/portal/administration')),
    requiredRole: 'SystemAdministrator',
  },
  {
    icon: IconSquareKey,
    label: 'Panel Administracyjny',
    to: '/portal/tenant-administration',
    active: computed(() => route.path.startsWith('/portal/tenant-administration')),
    requiredRole: 'TenantAdministrator',
  },
  {
    icon: IconCalendar,
    label: 'Kalendarz dni wolnych od zajęć',
    to: '/portal/free-days-calendar',
    active: computed(() => route.path === '/portal/free-days-calendar'),
  },
  {
    icon: IconChartArrows,
    label: 'Kierunki studiów',
    to: '/portal/study-programs',
    active: computed(() => route.path === '/portal/study-programs'),
  },
  {
    icon: IconTableColumn,
    label: 'Plany zajęć',
    to: '/portal/schedules',
    active: computed(() => route.path.startsWith('/portal/schedules')),
  },
  {
    icon: IconUsersGroup,
    label: 'Wykładowcy',
    to: '/portal/lecturers',
    active: computed(() => route.path === '/portal/lecturers'),
  },
  {
    icon: IconChalkboard,
    label: 'Sale',
    to: '/portal/classrooms',
    active: computed(() => route.path === '/portal/classrooms'),
  },
  {
    icon: IconUser,
    label: 'Użytkownicy',
    to: '/portal/user',
    active: computed(() => route.path === '/portal/user'),
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

const filteredTabs = computed(() => tabs.filter(tab => !tab.requiredRole || account.data?.roles.includes(tab.requiredRole)))
</script>

<template>
  <aside class="h-screen border-r bg-indigo-600 p-9">
    <logo link-url="/portal" color="indigo" class="mb-5" />
    <ul>
      <li v-for="tab in filteredTabs" :key="tab.label" class="group mb-2 group-hover:mb-4">
        <base-tab v-bind="tab" />
      </li>
    </ul>
  </aside>
</template>
