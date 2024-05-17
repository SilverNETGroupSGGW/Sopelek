<script  setup lang="ts">
import { addDays, addMonths, differenceInDays, eachDayOfInterval, endOfDay, endOfMonth, format, getMonth, isToday, startOfDay, startOfMonth, startOfWeek, startOfYear } from 'date-fns'
import { pl } from 'date-fns/locale'

const props = defineProps<{
  display?: 'month' | 'year' | 'week' | 'day'
  startDate?: '2022-12-05'
}>()

// const displayMode = ref(props.display || 'month')
const viewDate = ref<string>(props.startDate || format(new Date(), 'yyyy-MM-dd'))

const reset = function () {
  viewDate.value = format(new Date(), 'yyyy-MM-dd')
}

const shiftMonth = function (amount: number) {
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

const daysToPrepend = computed(() => {
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
})

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
  <div class="grid grid-cols-7 gap-1 mt-5 mb-5">
    <div v-for="d in daysOfWeek" :key="d" class="text-center">
      <div>{{ d }}</div>
    </div>
  </div>
  <div class="grid grid-cols-7">
    <div v-for="p in daysToPrepend" :key="p.toString()" class="bg-midnight" />
    <div v-for="d in units" :key="d.toString()" class="border border-slate-200 flex flex-col h-32">
      <slot :date="d" />
    </div>
  </div>
</template>
