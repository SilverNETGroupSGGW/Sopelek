<script setup lang="ts">
import { ChartBarIcon, CurrencyDollarIcon, RocketLaunchIcon } from '@heroicons/vue/24/solid'

const sections = [
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
    <div class="mx-auto grid max-w-7xl gap-16 px-4 sm:gap-y-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
      <div class="lg:order-last">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
          Witaj w Plan Creator
        </h2>

        <p class="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
          Plan Creator to innowacyjna aplikacja online zaprojektowana z myślą o łatwym i efektywnym tworzeniu harmonogramów zajęć dla uczelni wyższych. Dzięki zaawansowanym funkcjom i przyjaznemu interfejsowi, Plan Creator umożliwia szybkie i intuicyjne planowanie zajęć, dostosowane do potrzeb studentów i wykładowców.
        </p>

        <dl class="mt-6 space-y-4 leading-7">
          <div v-for="section in sections" :key="section.title" class="relative pl-8">
            <dt class="font-semibold text-gray-900 dark:text-white">
              <component :is="section.icon" class="absolute left-0 top-1 size-5" aria-hidden="true" />
              <span>{{ section.title }}</span>
            </dt>
            <dd class="leading-6 text-gray-500 dark:text-gray-400">
              {{ section.description }}
            </dd>
          </div>
        </dl>
      </div>

      <img class="size-full rounded-xl bg-gray-900/5 bg-[url('https://calendar.teamup.com/wp-content/uploads/2015/06/tu-schedulerview-new1.png')] bg-cover bg-center bg-no-repeat ring-1 ring-inset">
    </div>
  </div>
</template>
