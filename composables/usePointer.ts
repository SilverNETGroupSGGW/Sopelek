export default function usePointer(container: HTMLElement, x: Ref<number>, y: Ref<number>) {
  const runtimeConfig = useRuntimeConfig()
  const mouse = useMouse()

  const { onDragDown } = useDrag(container, x, y)

  function isOutside(e: PointerEvent) {
    const target = e.target as HTMLElement
    const rect = target.getBoundingClientRect()

    return (
      e.clientX < rect.left + runtimeConfig.public.edgeThreshold
      || e.clientX > rect.right - runtimeConfig.public.edgeThreshold
      || e.clientY < rect.top + runtimeConfig.public.edgeThreshold
      || e.clientY > rect.bottom - runtimeConfig.public.edgeThreshold
    )
  }

  function onPointerDown(e: PointerEvent) {
    if (!isOutside(e))
      onDragDown(e)
  }

  function onPointerMove(e: PointerEvent) {
    if (e.target) {
      const target = e.target as HTMLElement
      const rect = target.getBoundingClientRect()
      const edgeThreshold = runtimeConfig.public.edgeThreshold

      if (e.clientX < rect.left + edgeThreshold && e.clientY < rect.top + edgeThreshold)
        mouse.cursor = 'cursor-nw-resize'
      else if (e.clientX > rect.right - edgeThreshold && e.clientY < rect.top + edgeThreshold)
        mouse.cursor = 'cursor-ne-resize'
      else if (e.clientX > rect.right - edgeThreshold && e.clientY > rect.bottom - edgeThreshold)
        mouse.cursor = 'cursor-se-resize'
      else if (e.clientX < rect.left + edgeThreshold && e.clientY > rect.bottom - edgeThreshold)
        mouse.cursor = 'cursor-sw-resize'
      else if (e.clientX < rect.left + edgeThreshold)
        mouse.cursor = 'cursor-w-resize'
      else if (e.clientX > rect.right - edgeThreshold)
        mouse.cursor = 'cursor-e-resize'
      else if (e.clientY < rect.top + edgeThreshold)
        mouse.cursor = 'cursor-n-resize'
      else if (e.clientY > rect.bottom - edgeThreshold)
        mouse.cursor = 'cursor-s-resize'
      else
        mouse.cursor = 'cursor-move'
    }
  }

  return {
    isOutside,
    onPointerDown,
    onPointerMove,
  }
}
