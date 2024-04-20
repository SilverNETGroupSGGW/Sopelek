<script setup lang="ts" generic="T extends {}">
import { IconSearchOff } from '@tabler/icons-vue'

const props = defineProps<{
  columns: { key: string, header: string }[]
  data: T[]
  search: string
  filter?: (row: T) => boolean
}>()

const route = useRoute()
// const router = useRouter()

const page = ref(Number.parseInt(route.query.page as string) || 1)
// watchEffect(async () => {
//   await navigateTo({
//     query: {
//       page: page.value,
//       search: props.search,
//     },
//   })
// })

// router.beforeEach((to, from) => {
//   // Reset page to 1 when going to a different route
//   if (to.path !== from.path)
//     page.value = 1
// })

function defaultFilter(row: T, predicate?: (row: T) => boolean) {
  if (props.search === '' && !predicate)
    return true

  const searchFilter = props.search !== '' && Object.values(row).some(value =>
    (value as string)?.toString().toLowerCase().includes(props.search.toLowerCase()),
  )

  const predicateFilter = predicate ? predicate(row) : true
  return searchFilter && predicateFilter
}

const filter = props.filter || defaultFilter

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
              <IconSearchOff class="size-5 text-gray-400" />
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
