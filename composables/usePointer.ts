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
    mouse.isActive = !isOutside(e)
  }

  return {
    isOutside,
    onPointerDown,
    onPointerMove,
  }
}
