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

    window.addEventListener('pointermove', onResizeMove)
    window.addEventListener('pointerup', onResizeUp)
  }

  function onResizeMove(e: PointerEvent) {
    if (mouse.isResizing) {
      requestAnimationFrame(() => {
        const deltaX = e.clientX - original.value.mouseX
        const deltaY = e.clientY - original.value.mouseY
        let newX: number, newY: number, newWidth: number, newHeight: number, snappedX: number, snappedY: number

        if (mouse.resizeEdge.includes('w')) {
          newX = original.value.x + deltaX
          snappedX = Math.round(newX / runtimeConfig.public.intervalWidth) * runtimeConfig.public.intervalWidth
          newWidth = original.value.width + original.value.x - snappedX

          if (newWidth > 0) {
            x.value = snappedX
            width.value = newWidth
          }
        }
        if (mouse.resizeEdge.includes('n')) {
          newY = original.value.y + deltaY
          snappedY = Math.round(newY / runtimeConfig.public.intervalHeight) * runtimeConfig.public.intervalHeight
          newHeight = original.value.height + original.value.y - snappedY

          if (newHeight > 0) {
            y.value = snappedY
            height.value = newHeight
          }
        }
        if (mouse.resizeEdge.includes('e')) {
          newWidth = original.value.width + deltaX
          if (newWidth > 0)
            width.value = Math.round(newWidth / runtimeConfig.public.intervalWidth) * runtimeConfig.public.intervalWidth
        }
        if (mouse.resizeEdge.includes('s')) {
          newHeight = original.value.height + deltaY
          if (newHeight > 0)
            height.value = Math.round(newHeight / runtimeConfig.public.intervalHeight) * runtimeConfig.public.intervalHeight
        }
      })
    }
  }

  function onResizeUp(e: PointerEvent) {
    const target = e.target as HTMLElement
    target.releasePointerCapture(e.pointerId)
    mouse.isResizing = false

    window.removeEventListener('pointermove', onResizeMove)
    window.removeEventListener('pointerup', onResizeUp)
  }

  return {
    onResizeDown,
  }
}
