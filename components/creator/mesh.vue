<script setup lang="ts">
import { useCreator } from '~/stores/creator/useCreator'

const creator = useCreator()
</script>

<template>
  <div style="background-color: red; width: 100%; height: 100%">
    <div
      id="mesh"
      class="size-full"
      :style="{
        height: `${creator.intervalHeight * creator!.groups!.length + 1}px`,
        backgroundImage: `linear-gradient(to right, #e5e7eb 1px, transparent 1px), repeating-linear-gradient(to bottom, #e5e7eb, #e5e7eb 1px, #fff 1px, #fff 160px)`,
        backgroundSize: `${creator.intervalWidth}px ${creator.intervalHeight}px`,
      }"
    />
  </div>
</template>
