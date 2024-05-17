<script setup lang='ts'>
import { format, isEqual, isToday } from 'date-fns'

const offDays = useOffDays()
await offDays.getAll()

console.log(offDays.data)
</script>

<template>
  <base-calendar>
    <template #default="{ date }">
      <div :class="[isToday(date) ? 'bg-indigo-300' : '']" class="text-center">
        {{ format(date, 'd MMM yyy') }}
      </div>

      <div v-for="offDay in offDays.data.filter(od => isEqual(new Date(od.date), date))" :key="offDay.id">
        <div :class="[offDay.scope === 'Global' ? 'bg-red-300' : '']" class="text-center">
          {{ offDay.reason }}
        </div>
      </div>
    </template>
  </base-calendar>
</template>
