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
        if (mouse.resizeEdge === 'nw') {
          const newWidth = original.value.width - (e.clientX - original.value.mouseX)
          const newHeight = original.value.height - (e.clientY - original.value.mouseY)

          if (newWidth > 0) {
            x.value = original.value.x + (e.clientX - original.value.mouseX)
            width.value = Math.round(newWidth / runtimeConfig.public.intervalWidth) * runtimeConfig.public.intervalWidth
          }

          if (newHeight > 0) {
            y.value = original.value.y + (e.clientY - original.value.mouseY)
            height.value = Math.round(newHeight / runtimeConfig.public.intervalHeight) * runtimeConfig.public.intervalHeight
          }
        }
        else if (mouse.resizeEdge === 'ne') {
          const newWidth = original.value.width + (e.clientX - original.value.mouseX)
          const newHeight = original.value.height - (e.clientY - original.value.mouseY)

          if (newWidth > 0)
            width.value = Math.round(newWidth / runtimeConfig.public.intervalWidth) * runtimeConfig.public.intervalWidth

          if (newHeight > 0) {
            y.value = original.value.y + (e.clientY - original.value.mouseY)
            height.value = Math.round(newHeight / runtimeConfig.public.intervalHeight) * runtimeConfig.public.intervalHeight
          }
        }
        else if (mouse.resizeEdge === 'se') {
          const newWidth = original.value.width + (e.clientX - original.value.mouseX)
          const newHeight = original.value.height + (e.clientY - original.value.mouseY)

          if (newWidth > 0)
            width.value = Math.round(newWidth / runtimeConfig.public.intervalWidth) * runtimeConfig.public.intervalWidth

          if (newHeight > 0)
            height.value = Math.round(newHeight / runtimeConfig.public.intervalHeight) * runtimeConfig.public.intervalHeight
        }
        if (mouse.resizeEdge === 'sw') {
          const newWidth = original.value.width - (e.clientX - original.value.mouseX)
          const newHeight = original.value.height + (e.clientY - original.value.mouseY)

          if (newWidth > 0) {
            x.value = original.value.x + (e.clientX - original.value.mouseX)
            width.value = Math.round(newWidth / runtimeConfig.public.intervalWidth) * runtimeConfig.public.intervalWidth
          }

          if (newHeight > 0)
            height.value = Math.round(newHeight / runtimeConfig.public.intervalHeight) * runtimeConfig.public.intervalHeight
        }
        else if (mouse.resizeEdge === 'w') {
          const newX = original.value.x + e.clientX - original.value.mouseX
          const newWidth = original.value.width + original.value.x - Math.round(newX / runtimeConfig.public.intervalWidth) * runtimeConfig.public.intervalWidth

          if (newWidth > 0) {
            x.value = Math.round(newX / runtimeConfig.public.intervalWidth) * runtimeConfig.public.intervalWidth
            width.value = newWidth
          }
        }
        else if (mouse.resizeEdge === 'e') {
          const newWidth = original.value.width + (e.clientX - original.value.mouseX)

          if (newWidth > 0)
            width.value = Math.round(newWidth / runtimeConfig.public.intervalWidth) * runtimeConfig.public.intervalWidth
        }
        else if (mouse.resizeEdge === 's') {
          const newHeight = original.value.height + (e.clientY - original.value.mouseY)

          if (newHeight > 0)
            height.value = Math.round(newHeight / runtimeConfig.public.intervalHeight) * runtimeConfig.public.intervalHeight
        }
        else if (mouse.resizeEdge === 'n') {
          const newHeight = original.value.height + original.value.y - Math.round((original.value.y + e.clientY - original.value.mouseY) / runtimeConfig.public.intervalHeight) * runtimeConfig.public.intervalHeight

          if (newHeight > 0) {
            y.value = Math.round((original.value.y + e.clientY - original.value.mouseY) / runtimeConfig.public.intervalHeight) * runtimeConfig.public.intervalHeight
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

    window.removeEventListener('pointermove', onResizeMove)
    window.removeEventListener('pointerup', onResizeUp)
  }

  return {
    onResizeDown,
  }
}
