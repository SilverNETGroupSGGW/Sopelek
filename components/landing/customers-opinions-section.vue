<script setup lang="ts">
const opinions = [
  {
    text: 'Plan Creator znacząco uprościł proces tworzenia harmonogramów na naszej uczelni. Intuicyjny interfejs i zaawansowane funkcje są niezastąpione.',
    name: 'Anna Nowak',
    position: 'Dziekan Wydziału',
    avatar: 'https://i.pravatar.cc/120?img=10',
  },
  {
    text: 'Dzięki Plan Creator możemy szybko i łatwo dostosowywać plany zajęć do zmieniających się potrzeb studentów i wykładowców.',
    name: 'Michał Kowalski',
    position: 'Kierownik Działu IT',
    avatar: 'https://i.pravatar.cc/120?img=11',
  },
  {
    text: 'Bezpieczeństwo danych jest dla nas kluczowe, a Plan Creator spełnia wszystkie nasze oczekiwania w tej kwestii. Czujemy się pewnie, wiedząc, że nasze informacje są dobrze chronione.',
    name: 'Ewa Wiśniewska',
    position: 'Administrator Systemów',
    avatar: 'https://i.pravatar.cc/120?img=12',
  },
  {
    text: 'Plan Creator to niezastąpione narzędzie w naszym codziennym zarządzaniu zajęciami. Polecamy każdej uczelni, która szuka efektywnego rozwiązania.',
    name: 'Tomasz Zieliński',
    position: 'Rektor',
    avatar: 'https://i.pravatar.cc/120?img=13',
  },
  {
    text: 'Elastyczność i możliwość integracji z naszymi systemami sprawiają, że Plan Creator jest idealnym rozwiązaniem dla naszej uczelni.',
    name: 'Monika Lewandowska',
    position: 'Kierownik Działu Administracyjnego',
    avatar: 'https://i.pravatar.cc/120?img=14',
  },
  {
    text: 'Profesjonalne wsparcie techniczne i łatwość użytkowania sprawiają, że korzystanie z Plan Creator to przyjemność.',
    name: 'Piotr Woźniak',
    position: 'Kierownik Działu Nauczania',
    avatar: 'https://i.pravatar.cc/120?img=15',
  },
]
</script>

<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto flex max-w-7xl flex-col gap-16 px-4 sm:gap-y-24 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center text-center">
        <div class="mb-2 text-base/7 font-semibold">
          Referencje
        </div>

        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
          Co nasi kllienci o nas mówią.
        </h2>
      </div>

      <div class="gap-8 space-y-8 md:columns-2 lg:columns-3 xl:columns-4">
        <div v-for="opinion in opinions" :key="opinion.name" class="break-inside-avoid">
          <div class="relative divide-y divide-gray-200 rounded-xl bg-gray-100/50 shadow ring-1 ring-gray-200 dark:divide-gray-800 dark:bg-gray-800/50 dark:ring-gray-800">
            <div class="flex flex-col px-4 py-5 sm:p-6">
              <div>
                <q class="text-gray-600 dark:text-gray-300">
                  {{ opinion.text }}
                </q>

                <div class="relative mt-6 flex items-center gap-3">
                  <span class="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full text-base">
                    <img class="size-10 rounded-full text-base" alt="Rose Roberson" :src="opinion.avatar" loading="lazy">
                  </span>

                  <div>
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">
                      {{ opinion.name }}
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ opinion.position }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
