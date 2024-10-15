<script setup lang="ts">

</script>

<template>
  <main class="min-h-[calc(100vh-var(3.5rem))]">
    <div class="relative py-24 sm:py-32 md:py-40">
      <div class="mx-auto flex max-w-7xl flex-col gap-16 px-4 sm:gap-y-24 sm:px-6 lg:px-8">
        <div class="mt-24 text-center">
          <h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl dark:text-white">
            Silver Planner
          </h1>

          <p class="mt-6 text-lg tracking-tight text-gray-900 dark:text-gray-300">
            Nowoczesne narzędzie do tworzenia planów zajęć dla uczelni wyższych
          </p>

          <div class="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
            <landing-button text="Zacznij korzystać" to="/signup" theme="dark" :arrow="true" />
            <landing-button text="Zobacz ofertę" to="/pricing" theme="light" :arrow="false" />
          </div>
        </div>

        <div class="absolute inset-0 z-[-1] bg-gray-400">
          <TresCanvas
            clear-color="#c5c5c5"
            class="size-full"
          >
            <tres-background-lines />
          </TresCanvas>
        </div>
      </div>
    </div>
  </main>
</template>
