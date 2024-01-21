import type { DayOfWeek, Schedule, Subject } from '~/types'

export default function usePointer(schedule: Schedule, dayOfWeek: DayOfWeek, container: HTMLDivElement | null) {
  const { onResizeDown, onResizeMove, onResizeUp } = useResize(schedule, container)
  const { onDragDown } = useDrag(schedule, dayOfWeek, container)

  function onPointerMove(event: PointerEvent) {
    const rect = (event.target as HTMLElement).getBoundingClientRect()

    if (!(event.currentTarget as HTMLElement).id) {
      document.body.style.cursor = 'default'
      return
    }

    const nearLeft = Math.abs(event.clientX - rect.left) < 16
    const nearRight = Math.abs(event.clientX - rect.right) < 16
    const nearTop = Math.abs(event.clientY - rect.top) < 16
    const nearBottom = Math.abs(event.clientY - rect.bottom) < 16

    if (!nearLeft && !nearRight && !nearTop && !nearBottom) {
      (event.target as HTMLElement).style.cursor = 'move'
      return
    }

    if ((nearTop && nearLeft) || (nearBottom && nearRight))
      (event.target as HTMLElement).style.cursor = 'nwse-resize'

    else if ((nearTop && nearRight) || (nearBottom && nearLeft))
      (event.target as HTMLElement).style.cursor = 'nesw-resize'

    else if (nearLeft || nearRight)
      (event.target as HTMLElement).style.cursor = 'ew-resize'

    else if (nearTop || nearBottom)
      (event.target as HTMLElement).style.cursor = 'ns-resize'
  }

  function onPointerOut() {
    document.body.style.cursor = 'default'
  }

  function onPointerDown(event: PointerEvent, subject: Subject) {
    // Cleanup existing window event listeners
    window.removeEventListener('pointermove', onResizeMove)
    window.removeEventListener('pointerup', onResizeUp)

    if (event.button !== 0 || (event.target as HTMLElement).id.startsWith('link-') || !(event.target as HTMLElement).id)
      return

    // Determine if we're dragging or resizing
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    if (Math.abs(event.clientX - rect.left) < 16 || Math.abs(event.clientX - rect.right) < 16 || Math.abs(event.clientY - rect.top) < 16 || Math.abs(event.clientY - rect.bottom) < 16) {
      // We're resizing
      onResizeDown(event, subject)
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
