<script setup lang="ts">
const topBarLinks = [
  { name: 'Dokumentacja', href: '/docs' },
  { name: 'Cena', href: '/pricing' },
  { name: 'O nas', href: '/we' },
]
</script>

<template>
  <header class="sticky top-0 z-50 -mb-px border-b border-gray-200 backdrop-blur dark:border-gray-800">
    <div class="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-1.5 lg:flex-1">
        <a
          aria-current="page"
          href="/"
          class="flex shrink-0 items-end gap-1.5 text-xl font-bold text-gray-900 dark:text-white"
          aria-label="Nuxt UI Pro"
        >
          <logo color-class="bg-indigo-500" class="mr-2" />

          Plan Creator
        </a>
      </div>
      <ul v-for="link in topBarLinks" :key="link.name" class="hidden items-center gap-x-8 lg:flex">
        <li class="relative">
          <a class="flex items-center gap-1 text-sm/6 font-semibold hover:text-sky-700" :href="link.href">{{ link.name }}</a>
        </li>
      </ul>
      <div class="flex items-center justify-end gap-1.5 lg:flex-1">
        <landing-button text="Zaloguj" to="/signin" theme="light" :arrow="false" />
        <landing-button text="Zarejestruj" to="/signup" theme="dark" :arrow="true" />
      </div>
    </div>
  </header>
</template>
