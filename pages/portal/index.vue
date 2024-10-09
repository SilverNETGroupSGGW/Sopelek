<script setup lang="ts">
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

if (router.options.history.state?.back === '/signin') {
  toast.success('Witamy w aplikacji!')
}
</script>

<template>
  <div class="px-12 py-9">
    <div class="mb-8">
      <h1 class="mb-4 text-4xl font-bold text-gray-900">
        Plan SGGW
      </h1>
      <p class="mb-6 text-gray-700">
        Witaj w aplikacji Plan SGGW. Po lewej stronie znajduje się nawigacja strony.
      </p>

      <div class="flex flex-col gap-2">
        <div class="grid auto-rows-[1fr] grid-cols-3 gap-6">
          <utils-link-card
            link="/portal/schedules"
            header-text="Plany zajęć"
            messsage-text="W tym miejscu możesz sprawdzić plany zajęć dla wybranych kierunków studiów."
          />

          <utils-link-card
            link="/portal/lecturers"
            header-text="Prowadzący"
            messsage-text="W tym miejscu możesz sprawdzić prowadzących. Lista jest globalna i obejmuje Bazę Wiedzy SGGW."
          />

          <utils-link-card
            link="/portal/classrooms"
            header-text="Sale"
            messsage-text="W tym miejscu możesz sprawdzić sale."
          />
        </div>
      </div>
    </div>

    <div class="mb-1">
      <h2 class="mb-6 text-3xl font-bold text-gray-900">
        Co planujemy?
      </h2>

      <div class="flex gap-6">
        <utils-link-card
          header-text="Konflikty"
          messsage-text="System do wykrywania konfliktów w planach zajęć, dotyczyć to będzie sal, prowadzących oraz grup."
        />

        <utils-link-card
          header-text="Tryb publikacji"
          messsage-text="Możliwość tworzenia draftów oraz oficjalnych planów zajęć, które zarazem będą dostępne w aplikacji mobilnej."
        />

        <utils-link-card
          header-text="Definiowanie zajęć"
          messsage-text="Możliwość definiowania zajęć przedmiotu, które będą wyświetlane w planie. Przydatne gdy zajęcia trwają np. 2 tygodnie."
        />
      </div>
    </div>

    <layout-footer />
  </div>
</template>
