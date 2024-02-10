import type { DayOfWeek } from '~/types'

export default function usePointer(container: HTMLElement, dayOfWeek: DayOfWeek) {
  const mouse = useMouse()
  const scheduler = useScheduler()
  const runtimeConfig = useRuntimeConfig()

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

  function getResizeEdge(e: PointerEvent, rect: DOMRect, edgeThreshold: number) {
    if (e.clientX < rect.left + edgeThreshold && e.clientY < rect.top + edgeThreshold)
      return 'nw'
    else if (e.clientX > rect.right - edgeThreshold && e.clientY < rect.top + edgeThreshold)
      return 'ne'
    else if (e.clientX > rect.right - edgeThreshold && e.clientY > rect.bottom - edgeThreshold)
      return 'se'
    else if (e.clientX < rect.left + edgeThreshold && e.clientY > rect.bottom - edgeThreshold)
      return 'sw'
    else if (e.clientX < rect.left + edgeThreshold)
      return 'w'
    else if (e.clientX > rect.right - edgeThreshold)
      return 'e'
    else if (e.clientY < rect.top + edgeThreshold)
      return 'n'
    else if (e.clientY > rect.bottom - edgeThreshold)
      return 's'
    else
      return ''
  }

  function onPointerDown(e: PointerEvent) {
    mouse.currentLesson = scheduler.schedule!.subjects.find(subject => subject.id === (e.target as HTMLElement).id)!

    const { onDragDown } = useDrag(container)
    const { onResizeDown } = useResize(container, dayOfWeek)
    const { onCreateDown } = useCreate(container, dayOfWeek)

    if (mouse.currentLesson) {
      if (!isOutside(e)) {
        onDragDown(e)
        return
      }

      onResizeDown(e)
    }
    else {
      onCreateDown(e)
    }
  }

  function onPointerMove(e: PointerEvent) {
    if (e.target && !mouse.isDragging) {
      const mouse = useMouse()

      const target = e.target as HTMLElement
      const rect = target.getBoundingClientRect()
      const edgeThreshold = runtimeConfig.public.edgeThreshold

      switch (getResizeEdge(e, rect, edgeThreshold)) {
        case 'nw':
          mouse.cursor = 'cursor-nw-resize'
          break
        case 'ne':
          mouse.cursor = 'cursor-ne-resize'
          break
        case 'se':
          mouse.cursor = 'cursor-se-resize'
          break
        case 'sw':
          mouse.cursor = 'cursor-sw-resize'
          break
        case 'w':
          mouse.cursor = 'cursor-w-resize'
          break
        case 'e':
          mouse.cursor = 'cursor-e-resize'
          break
        case 'n':
          mouse.cursor = 'cursor-n-resize'
          break
        case 's':
          mouse.cursor = 'cursor-s-resize'
          break
        default:
          mouse.cursor = 'cursor-move'
      }
    }
  }

  return {
    isOutside,
    getResizeEdge,
    onPointerDown,
    onPointerMove,
  }
}
