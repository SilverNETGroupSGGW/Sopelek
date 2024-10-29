<script setup lang="ts">
</script>

<template>
  <div id="navBar" />
  <header class="sticky top-0 z-50 -mb-px border-b border-gray-200 backdrop-blur dark:border-gray-800">
    <div class="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-1.5 lg:flex-1">
        <NuxtLink
          aria-current="page"
          href="/#home"
          class="flex shrink-0 items-end gap-1.5 text-xl font-bold text-gray-900 dark:text-white"
          aria-label="Nuxt UI Pro"
        >
          <logo color="gray" class="mr-2" />
          Silver Planner
        </NuxtLink>
      </div>
      <ul class="hidden items-center gap-x-8 lg:flex">
        <li class="relative">
          <NuxtLink
            class="flex items-center gap-1 text-sm/6 font-semibold hover:text-sky-700"
            href="/#home"
          >
            Home
          </NuxtLink>
        </li>
        <li class="relative">
          <NuxtLink
            class="flex items-center gap-1 text-sm/6 font-semibold hover:text-sky-700"
            href="#descriptionSection"
          >
            Opis projektu
          </NuxtLink>
        </li>
        <li class="relative">
          <NuxtLink
            class="flex items-center gap-1 text-sm/6 font-semibold hover:text-sky-700"
            to="#teamSection"
          >
            O nas
          </NuxtLink>
        </li>
      </ul>
      <div class="flex items-center justify-end gap-1.5 lg:flex-1">
        <landing-button text="Zaloguj" to="/signin" theme="light" :arrow="false" />
        <landing-button text="Zarejestruj" to="/signup" theme="dark" :arrow="true" />
      </div>
    </div>
  </header>
</template>
