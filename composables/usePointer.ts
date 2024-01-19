import type { DayOfWeek, Schedule, Subject } from '~/types'

export default function usePointer(schedule: Schedule, dayOfWeek: DayOfWeek, container: HTMLDivElement | null) {
  const { onResizeDown, onResizeMove, onResizeUp } = useResize(schedule, container)
  const { onDragDown } = useDrag(schedule, dayOfWeek, container)

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
    onPointerDown,
  }
}
