import type { Subject } from '~/types'

export default function useDrag(container: HTMLElement) {
  const mouse = useMouse()
  const runtimeConfig = useRuntimeConfig()

  let offsetX = 0
  let offsetY = 0

  function onDragDown(e: PointerEvent) {
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    mouse.isDragging = true

    offsetX = e.clientX - mouse.currentLesson.x!
    offsetY = e.clientY - mouse.currentLesson.y!

    e.target?.addEventListener('pointermove', (e: Event) => onDragMove(e as PointerEvent))
    e.target?.addEventListener('pointerup', (e: Event) => onDragUp(e as PointerEvent))
  }

  function onDragMove(e: PointerEvent) {
    if (mouse.isDragging) {
      requestAnimationFrame(() => {
        let newX = e.clientX - offsetX
        let newY = e.clientY - offsetY

        newX = Math.round(newX / runtimeConfig.public.intervalWidth) * runtimeConfig.public.intervalWidth
        newY = Math.round(newY / runtimeConfig.public.intervalHeight) * runtimeConfig.public.intervalHeight

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

        mouse.currentLesson.x = newX
        mouse.currentLesson.y = newY
      })
    }
  }

  function onDragUp(e: PointerEvent) {
    const target = e.target as HTMLElement
    target.releasePointerCapture(e.pointerId)
    mouse.isDragging = false

    target.removeEventListener('pointermove', (e: Event) => onDragMove(e as PointerEvent))
    target.removeEventListener('pointerup', (e: Event) => onDragUp(e as PointerEvent))

    mouse.currentLesson = {} as Subject
  }

  return {
    onDragDown,
    onDragUp,
    onDragMove,
  }
}
