<script setup lang="ts">
import { useCreator } from '~/stores/creator/useCreator'

const creator = useCreator()
</script>

<template>
  <div class="sticky top-0 z-50 flex w-max flex-col bg-white">
    <div class="flex">
      <div
        class="flex h-9 shrink-0"
        :style="{
          width: `${creator.groupHeaderColumnWidth - 19}px`,
        }"
      />

      <p
        v-for="(time, index) in creator.timeRange"
        :key="index"
        class="flex h-9 items-center whitespace-nowrap text-center font-medium text-gray-700"
        :style="{ width: `${creator.intervalWidth * creator.meshCountBeetwenHeaderTime}px` }"
      >
        {{ time.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }) }}
      </p>
    </div>

    <div class="flex">
      <div :style="{ width: `${creator.groupHeaderColumnWidth}px` }" />
      <div
        :style="{
          height: '10px',
          width: `calc(100% - ${creator.groupHeaderColumnWidth}px)`,
          backgroundImage: `repeating-linear-gradient(to right, #e5e7eb, #e5e7eb 1px, #fff 1px, #fff ${creator.intervalWidth}px)`,
          backgroundSize: `3480px ${creator.intervalWidth}px`,
        }"
      />
    </div>
  </div>
</template>
