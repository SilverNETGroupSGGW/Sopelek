<script setup lang="ts">
import { ChartBarIcon, CheckIcon, CogIcon, CurrencyDollarIcon, LockClosedIcon, RocketLaunchIcon } from '@heroicons/vue/24/solid'

const sections = [
  {
    title: 'Prostota użytkowania',
    description: 'Przyjazny interfejs użytkownika sprawia, że tworzenie i modyfikowanie planów zajęć jest niezwykle proste, nawet dla osób bez zaawansowanej wiedzy technicznej.',
    icon: CogIcon,
  },
  {
    title: 'Inteligentne planowanie',
    description: 'Nasze algorytmy automatycznie optymalizują harmonogramy, zapewniając równowagę pomiędzy różnymi zajęciami i zasobami.',
    icon: CheckIcon,
  },
  {
    title: 'Elastyczność',
    description: 'Łatwo dostosowuj harmonogramy do zmieniających się potrzeb, bez zbędnych komplikacji.',
    icon: LockClosedIcon,
  },
  {
    title: 'Szybkość',
    description: 'Nadzwyczajna oszczęsność czasu przy układaniu planów zajęć.',
    icon: RocketLaunchIcon,
  },
  {
    title: 'Przystepność cenowa',
    description: 'Świetne narzędzie za niski koszt.',
    icon: CurrencyDollarIcon,
  },
  {
    title: 'Skalowanie',
    description: 'Dostosuj swój własny plan do usługi taki jaki potrzebujesz.',
    icon: ChartBarIcon,
  },
]
</script>

<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto flex max-w-7xl flex-col gap-16 px-4 sm:gap-y-24 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
          Dlaczego wybór naszego produktu jest dobrym pomysłem?
        </h2>

        <p class="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
          Plan Creator to narzędzie, które zrewolucjonizuje sposób, w jaki zarządzasz harmonogramami zajęć na swojej uczelni. Oto, co nas wyróżnia:
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="section in sections" :key="section.title"
          class="group relative isolate flex flex-1 flex-col rounded-xl shadow ring-1 ring-gray-200 before:absolute before:inset-[2px] before:z-[-1] before:hidden before:size-[calc(100%+4px)] before:rounded-[13px] before:lg:block"
        >
          <div class="flex flex-1 flex-col divide-y divide-gray-200 overflow-hidden rounded-xl bg-white transition-[background-opacity] hover:opacity-90">
            <div class="flex flex-1 flex-col gap-x-8 gap-y-4 rounded-xl px-4 py-5 sm:p-6">
              <div>
                <div class="pointer-events-none mb-2">
                  <component :is="section.icon" class="size-8 shrink-0 text-gray-900" aria-hidden="true" />
                </div>
                <p class="truncate text-base font-bold text-gray-900 dark:text-white">
                  {{ section.title }}
                </p>
                <p class="mt-1 text-[15px] text-gray-500 dark:text-gray-400">
                  {{ section.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
