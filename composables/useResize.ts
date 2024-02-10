export default function useResize(container: HTMLElement, x: Ref<number>, y: Ref<number>, width: Ref<number>, height: Ref<number>) {
  const mouse = useMouse()
  const runtimeConfig = useRuntimeConfig()

  const original = ref({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
  })

  function onResizeDown(e: PointerEvent) {
    const { getResizeEdge } = usePointer(container, x, y, width, height)
    const runtimeConfig = useRuntimeConfig()

    const target = e.target as HTMLElement
    target.setPointerCapture(e.pointerId)
    mouse.isResizing = true

    original.value = {
      x: x.value,
      y: y.value,
      width: width.value,
      height: height.value,
      mouseX: e.clientX,
      mouseY: e.clientY,
    }

    const rect = target.getBoundingClientRect()
    const edgeThreshold = runtimeConfig.public.edgeThreshold

    mouse.resizeEdge = getResizeEdge(e, rect, edgeThreshold)

    e.target?.addEventListener('pointermove', (e: Event) => onResizeMove(e as PointerEvent))
    e.target?.addEventListener('pointerup', (e: Event) => onResizeUp(e as PointerEvent))
  }

  function onResizeMove(e: PointerEvent) {
    if (mouse.isResizing) {
      requestAnimationFrame(() => {
        const deltaX = e.clientX - original.value.mouseX
        const deltaY = e.clientY - original.value.mouseY
        let newX: number, newY: number, newWidth: number, newHeight: number, snappedX: number, snappedY: number

        if (mouse.resizeEdge.includes('w')) {
          newX = original.value.x + deltaX
          newWidth = original.value.width - deltaX
          if (newWidth <= runtimeConfig.public.intervalWidth) {
            x.value += width.value - runtimeConfig.public.intervalWidth
            width.value = runtimeConfig.public.intervalWidth
          }
          else {
            snappedX = Math.round(newX / runtimeConfig.public.intervalWidth) * runtimeConfig.public.intervalWidth
            newWidth = original.value.width + original.value.x - snappedX
            if (newWidth > 0 && newX >= 0) {
              x.value = snappedX
              width.value = newWidth
            }
          }
        }

        if (mouse.resizeEdge.includes('n')) {
          newY = original.value.y + deltaY
          newHeight = original.value.height - deltaY
          if (newHeight <= runtimeConfig.public.intervalHeight) {
            y.value += height.value - runtimeConfig.public.intervalHeight
            height.value = runtimeConfig.public.intervalHeight
          }
          else {
            snappedY = Math.round(newY / runtimeConfig.public.intervalHeight) * runtimeConfig.public.intervalHeight
            newHeight = original.value.height + original.value.y - snappedY
            if (newHeight > 0 && newY >= 0) {
              y.value = snappedY
              height.value = newHeight
            }
          }
        }

        if (mouse.resizeEdge.includes('e')) {
          newWidth = original.value.width + deltaX
          if (newWidth <= runtimeConfig.public.intervalWidth) { width.value = runtimeConfig.public.intervalWidth }
          else {
            newWidth = Math.round(newWidth / runtimeConfig.public.intervalWidth) * runtimeConfig.public.intervalWidth
            if (newWidth + x.value <= container.offsetWidth)
              width.value = newWidth
          }
        }

        if (mouse.resizeEdge.includes('s')) {
          newHeight = original.value.height + deltaY
          if (newHeight <= runtimeConfig.public.intervalHeight) { height.value = runtimeConfig.public.intervalHeight }
          else {
            newHeight = Math.round(newHeight / runtimeConfig.public.intervalHeight) * runtimeConfig.public.intervalHeight
            if (newHeight + y.value <= container.offsetHeight)
              height.value = newHeight
          }
        }
      })
    }
  }

  function onResizeUp(e: PointerEvent) {
    const target = e.target as HTMLElement
    target.releasePointerCapture(e.pointerId)
    mouse.isResizing = false

    e.target?.removeEventListener('pointermove', (e: Event) => onResizeMove(e as PointerEvent))
    e.target?.removeEventListener('pointerup', (e: Event) => onResizeUp(e as PointerEvent))
  }

  return {
    onResizeDown,
  }
}
