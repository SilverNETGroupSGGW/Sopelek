import type { Schedule } from '~/types'

export default function usePointer(schedule: Schedule, container: HTMLDivElement | null) {
  const runtimeConfig = useRuntimeConfig()

  const { onResizeDown, onResizeMove, onResizeUp } = useResize(schedule, container)
  const { onDragDown } = useDrag(schedule, container)

  function onPointerMove(event: PointerEvent) {
    const rect = (event.target as HTMLElement).getBoundingClientRect()

    if (!(event.currentTarget as HTMLElement).id) {
      document.body.style.cursor = 'default'
      return
    }

    const nearLeft = Math.abs(event.clientX - rect.left) < runtimeConfig.public.edgeThreshold
    const nearRight = Math.abs(event.clientX - rect.right) < runtimeConfig.public.edgeThreshold
    const nearTop = Math.abs(event.clientY - rect.top) < runtimeConfig.public.edgeThreshold
    const nearBottom = Math.abs(event.clientY - rect.bottom) < runtimeConfig.public.edgeThreshold

    if (!nearLeft && !nearRight && !nearTop && !nearBottom) {
      (event.currentTarget as HTMLElement).style.cursor = 'move'
      return
    }

    if ((nearTop && nearLeft) || (nearBottom && nearRight))
      (event.currentTarget as HTMLElement).style.cursor = 'nwse-resize'

    else if ((nearTop && nearRight) || (nearBottom && nearLeft))
      (event.currentTarget as HTMLElement).style.cursor = 'nesw-resize'

    else if (nearLeft || nearRight)
      (event.currentTarget as HTMLElement).style.cursor = 'ew-resize'

    else if (nearTop || nearBottom)
      (event.currentTarget as HTMLElement).style.cursor = 'ns-resize'
  }

  function onPointerOut() {
    document.body.style.cursor = 'default'
  }

  function onPointerDown(event: PointerEvent) {
    // Cleanup existing window event listeners
    window.removeEventListener('pointermove', onResizeMove)
    window.removeEventListener('pointerup', onResizeUp)

    if (event.button !== 0 || (event.target as HTMLElement).id.startsWith('link-') || (event.target as HTMLElement).id.startsWith('copy-') || !(event.target as HTMLElement).id)
      return

    // Determine if we're dragging or resizing
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    if (Math.abs(event.clientX - rect.left) < runtimeConfig.public.edgeThreshold || Math.abs(event.clientX - rect.right) < runtimeConfig.public.edgeThreshold || Math.abs(event.clientY - rect.top) < runtimeConfig.public.edgeThreshold || Math.abs(event.clientY - rect.bottom) < runtimeConfig.public.edgeThreshold) {
      // We're resizing
      onResizeDown(event)
    }
    else {
      // We're dragging
      onDragDown(event)
    }
  }

  return {
    onPointerMove,
    onPointerOut,
    onPointerDown,
  }
}
