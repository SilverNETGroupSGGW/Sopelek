<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  container: HTMLElement | null
}>()

const runtimeConfig = useRuntimeConfig()

const mouse = useMouse()

const x = ref(0)
const y = ref(0)
const width = ref(runtimeConfig.public.intervalWidth * 18)
const height = ref(runtimeConfig.public.intervalHeight)

let onPointerDown: ((e: PointerEvent) => void) | null = null
let onPointerMove: ((e: PointerEvent) => void) | null = null

watchEffect(() => {
  if (props.container) {
    ;({ onPointerDown, onPointerMove } = usePointer(props.container, x, y, width, height))
  }
})
</script>

<template>
  <div
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(${x}px, ${y}px)`,
    }"
    class="absolute border border-blue-400 bg-blue-50"
    :class="[mouse.cursor]"
    @pointerdown.prevent="onPointerDown!"
    @pointermove.prevent="onPointerMove!"
  >
    <div />
  </div>
</template>
