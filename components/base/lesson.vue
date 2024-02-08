<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  container: HTMLElement | null
}>()

const mouse = useMouse()

const x = ref(0)
const y = ref(0)

let onPointerDown: ((e: PointerEvent) => void) | null = null
let onPointerMove: ((e: PointerEvent) => void) | null = null

const unwatch = watchEffect(() => {
  if (props.container) {
    unwatch()
    ;({ onPointerDown, onPointerMove } = usePointer(props.container, x, y))
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
    @pointerdown.prevent="onPointerDown!"
    @pointermove.prevent="onPointerMove!"
  >
    <div />
  </div>
</template>
