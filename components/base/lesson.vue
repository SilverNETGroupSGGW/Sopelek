<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  container: HTMLElement | null
}>()

const mouse = useMouse()

const x = ref(0)
const y = ref(0)

let onDragDown: ((e: PointerEvent) => void) | null = null
let onDragMove: ((e: PointerEvent) => void) | null = null
let onDragUp: ((e: PointerEvent) => void) | null = null

const unwatch = watchEffect(() => {
  if (props.container) {
    unwatch()
    ;({ onDragDown, onDragMove, onDragUp } = useDrag(props.container, x, y))
  }
})
</script>

<template>
  <div
    :style="{
      width: `${$config.public.intervalWidth * 18}px`,
      height: `${$config.public.groupHeight}px`,
      transform: `translate(${x}px, ${y}px)`,
    }"
    class="absolute border border-blue-400 bg-blue-50"
    :class="[mouse.isActive && 'cursor-move']"
    @pointerdown.prevent="onDragDown!"
    @pointermove.prevent="onDragMove!"
    @pointerup.prevent="onDragUp!"
  >
    <div />
  </div>
</template>
