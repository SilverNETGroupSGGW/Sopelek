<script setup lang="ts" generic="T extends {}">
import { MagnifyingGlassMinusIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  data: T[]
  columns: { key: string, header: string }[]
  search: string
}>()

const page = ref(1)

function filter(row: T) {
  if (props.search === '')
    return true

  return Object.values(row).some(value => (value as string).toString().toLowerCase().includes(props.search.toLowerCase()))
}

const filteredData = computed(() => props.data.filter(row => filter(row)))
const paginatedData = computed(() => filteredData.value.slice((page.value - 1) * 10, page.value * 10))
</script>

<template>
  <div class="overflow-x-scroll">
    <table class="w-full">
      <thead class="border-b border-gray-200">
        <tr>
          <th v-for="column in columns" :key="column.key" class="px-12 py-2 text-left font-semibold text-indigo-600">
            {{ column.header }}
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200 align-top">
        <tr v-for="(row, index) in paginatedData" :key="index">
          <template v-if="paginatedData.length > 0">
            <td v-for="column in columns" :key="column.key" class="whitespace-nowrap px-12 py-4">
              <slot :name="column.key" :cell="row" :index="index" />
            </td>
          </template>
        </tr>

        <tr v-if="paginatedData.length === 0">
          <td :colspan="columns.length + 1" class="whitespace-nowrap px-12 py-4">
            <div class="flex items-center justify-center gap-2">
              <MagnifyingGlassMinusIcon class="h-5 w-5 text-gray-400" />
              <span class="text-gray-400">Brak wyników</span>
            </div>
          </td>
        </tr>
      </tbody>

      <tfoot class="border-y border-gray-200">
        <tr>
          <td class="px-12 py-4">
            <base-pagination v-model="page" :filtered-data="filteredData" />
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
