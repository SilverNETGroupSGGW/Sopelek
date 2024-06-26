<script  setup lang="ts">
import { addDays, addMonths, differenceInDays, endOfDay, endOfMonth, format, startOfDay, startOfMonth, startOfWeek } from 'date-fns'
import { enGB, pl } from 'date-fns/locale'

const props = defineProps<{
  startDate?: string
}>()

const viewDate = ref<string>(props.startDate || format(new Date(), 'yyyy-MM-dd'))

function reset() {
  viewDate.value = format(new Date(), 'yyyy-MM-dd')
}

function shiftMonth(amount: number) {
  viewDate.value = format(addMonths(viewDate.value, amount), 'yyyy-MM-dd')
}

const daysOfWeek = computed(
  () => {
    const daysOfWeek = []
    for (let i = 1; i <= 7; i++) {
      const day = new Date(2024, 3, i)
      const dayName = format(day, 'EEEE', { locale: pl, weekStartsOn: 1 })
      daysOfWeek.push(dayName)
    }
    return daysOfWeek
  },
)

function daysToPrepend() {
  const viewDateValue = new Date(viewDate.value)
  const startOfMonthValue = addDays(startOfMonth(viewDateValue), -1)
  const startOfFirstWeekValue = startOfWeek(startOfMonthValue)

  const daysToFirstDay = differenceInDays(startOfMonthValue, startOfFirstWeekValue)

  const days = []
  for (let i = 1; i <= daysToFirstDay; i++) {
    const day = addDays(startOfFirstWeekValue, i - 1)
    days.push(day)
  }

  return days
}

const units = computed(() => {
  const ranges = []
  const startOfRange = startOfDay(startOfMonth(new Date(viewDate.value)))
  const endOfRange = endOfDay(endOfMonth(new Date(viewDate.value)))

  let currentDate = startOfRange

  while (currentDate <= endOfRange) {
    ranges.push(currentDate)
    currentDate = addDays(currentDate, 1)
  }

  return ranges
})
</script>

<template>
  <div>
    <div class="flex gap-1">
      <base-button variant="primary" @click="reset">
        Dziś
      </base-button>
      <base-button variant="primary" @click="shiftMonth(-1)">
        Poprzedni
      </base-button>
      <base-button variant="primary" @click="shiftMonth(1)">
        Następny
      </base-button>
      <span class="text-3xl">{{ format(viewDate, 'LLLL yyyy', { locale: pl }) }}</span>
    </div>
    <div class="my-5 grid grid-cols-7 gap-1">
      <div v-for="d in daysOfWeek" :key="d" class="text-center">
        <div>{{ d }}</div>
      </div>
    </div>
    <div class="grid grid-cols-7">
      <div v-for="p in daysToPrepend" :key="p.toString()" class="bg-gray-900" />
      <div v-for="d in units" :key="d.toString()" class="flex h-32 flex-col border border-slate-200">
        <slot :date="d" />
      </div>
    </div>
  </div>
</template>
