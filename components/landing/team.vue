<script setup lang="ts">
const sections = [
  {
    name: 'Fabian Oleksiuk',
    role: 'Developer',
    photo: 'https://scontent.fpoz4-1.fna.fbcdn.net/v/t1.6435-9/72435846_2737571729601050_5446945604313808896_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=SktfUj8qSxkQ7kNvgGQ2P6d&_nc_ht=scontent.fpoz4-1.fna&_nc_gid=AgIecRrp0RjpiuPIqznq5qF&oh=00_AYAArD1LJZYdIy2T_uhbM5aWs1uv7bk-r1UYRNTjrQqs7A&oe=673096B8',
  },
  {
    name: 'Bartosz Matyjasiak',
    role: 'Developer',
    photo: 'BartoszMatyjsiak.jpg',
  },
  {
    name: 'Grzegorz Perun',
    role: 'Developer',
    photo: 'GrzegorzPerun.png',
  },
  {
    name: 'Kuba Orchowski',
    role: 'Developer',
    photo: 'KubaOrchowskiProfile.png',
  },
  {
    name: 'Bartek Kwaśny',
    role: 'Developer',
    photo: 'BartekKwasny.jpg',
  },
  {
    name: 'Konrad Maleńczak',
    role: 'Developer',
    photo: 'KonradMaleńczak.png',
  },
]
</script>

<template>
  <div id="teamSection" class="py-24 sm:py-32">
    <h2 class="mb-10  items-center text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
      Nasz Zespół
    </h2>

    <div class="mx-4 flex flex-wrap justify-center">
      <a
        v-for="section in sections"
        :key="section.name"
        class="w-full md:w-6/12 lg:w-4/12 xl:w-3/12"
      >
        <div
          class="m-3 rounded-3xl bg-gray-100/50 px-6 py-12 text-center text-neutral-900 shadow-xl"
        >
          <img
            class="mx-auto mb-4 aspect-square w-full rounded-xl sm:w-4/6"
            alt="{{ section.name }}'s photo"
            :srcset="section.photo"
            :src="section.photo"
          >
          <h5 class="mb-2 font-bold">
            {{ section.name }}
          </h5>
          <p class="text-sm">
            {{ section.role }}
          </p>
        </div>
      </a>
    </div>
  </div>
</template>
