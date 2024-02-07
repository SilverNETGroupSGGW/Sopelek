<script setup lang="ts">
const x = ref(0)
const y = ref(0)

const { onDragDown, onDragMove, onDragUp } = useDrag(x, y)
</script>

<template>
  <div
    :style="{
      width: `${$config.public.intervalWidth * 18}px`,
      height: `${$config.public.groupHeight}px`,
      transform: `translate(${x}px, ${y}px)`,
    }"
    class="absolute border border-blue-400 bg-blue-50"
    @pointerdown.prevent="onDragDown"
    @pointermove.prevent="onDragMove"
    @pointerup.prevent="onDragUp"
  >
    <div />
  </div>
</template>
