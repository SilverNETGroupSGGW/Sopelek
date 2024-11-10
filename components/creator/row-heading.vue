<script setup lang="ts">
import { useCreator } from '~/stores/creator/useCreator'

const creator = useCreator()
</script>

<template>
  <div>
    <div
      v-for="(group, index) in creator.groups"
      :id="group.id"
      :key="index"
      class="flex shrink-0 items-center justify-center border-t border-t-gray-200 text-center text-xs text-gray-700"
      :style="{
        width: `${creator.groupHeaderColumnWidth}px`,
        height: `${creator.intervalHeight}px`,
      }"
    >
      {{ group.name }}
    </div>
    <div class="border-t border-t-gray-200" />
  </div>
</template>
