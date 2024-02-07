export default function useDrag(container: HTMLElement, x: Ref<number>, y: Ref<number>) {
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

          // Get the dimensions of the container and the element
          const containerRect = container.getBoundingClientRect()
          const elementRect = (e.target as HTMLElement).getBoundingClientRect()

          // Check the boundaries for the X value
          if (newX < 0)
            newX = 0
          else if (newX > containerRect.width - elementRect.width)
            newX = containerRect.width - elementRect.width

          // Check the boundaries for the Y value
          if (newY < 0)
            newY = 0
          else if (newY > containerRect.height - elementRect.height)
            newY = containerRect.height - elementRect.height

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
