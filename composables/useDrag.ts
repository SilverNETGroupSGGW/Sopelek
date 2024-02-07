export default function useDrag(x: Ref<number>, y: Ref<number>) {
  const runtimeConfig = useRuntimeConfig()

  const isDragging = ref(false)

  let offsetX = 0
  let offsetY = 0

  function onDragDown(e: PointerEvent) {
    const target = e.target as HTMLElement

    const rect = target.getBoundingClientRect()
    const isOutside = (
      e.clientX < rect.left + runtimeConfig.public.edgeThreshold
      || e.clientX > rect.right - runtimeConfig.public.edgeThreshold
      || e.clientY < rect.top + runtimeConfig.public.edgeThreshold
      || e.clientY > rect.bottom - runtimeConfig.public.edgeThreshold
    )

    if (isOutside)
      return

    target.setPointerCapture(e.pointerId)
    isDragging.value = true

    offsetX = e.clientX - x.value
    offsetY = e.clientY - y.value
  }

  function onDragUp(e: PointerEvent) {
    const target = e.target as HTMLElement
    target.releasePointerCapture(e.pointerId)
    isDragging.value = false
  }

  function onDragMove(e: PointerEvent) {
    if (isDragging.value) {
      requestAnimationFrame(() => {
        if (isDragging.value) {
          let newX = e.clientX - offsetX
          let newY = e.clientY - offsetY

          newX = Math.round(newX / runtimeConfig.public.intervalWidth) * runtimeConfig.public.intervalWidth
          newY = Math.round(newY / runtimeConfig.public.groupHeight) * runtimeConfig.public.groupHeight

          x.value = newX
          y.value = newY
        }
      })
    }
  }
  return {
    onDragDown,
    onDragUp,
    onDragMove,
  }
}
