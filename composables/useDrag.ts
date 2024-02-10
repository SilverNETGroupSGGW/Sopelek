import { computed, ref } from 'vue'
import type { Subject } from '~/types'

export default function useDrag(container: HTMLElement) {
  const mouse = useMouse()
  const scheduler = useScheduler()
  const runtimeConfig = useRuntimeConfig()

  const offsetX = ref(0)
  const offsetY = ref(0)

  const baseDate = ref(new Date(1970, 0, 1, 8, 0, 0, 0))

  const minutes = computed(() => (mouse.currentLesson.x! / 24) * 5)

  function onDragDown(e: PointerEvent) {
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    mouse.isDragging = true

    offsetX.value = e.clientX - mouse.currentLesson.x!
    offsetY.value = e.clientY - mouse.currentLesson.y!

    e.target?.addEventListener('pointermove', (e: Event) => onDragMove(e as PointerEvent))
    e.target?.addEventListener('pointerup', (e: Event) => onDragUp(e as PointerEvent))
  }

  function onDragMove(e: PointerEvent) {
    if (mouse.isDragging) {
      requestAnimationFrame(() => {
        let newX = e.clientX - offsetX.value
        let newY = e.clientY - offsetY.value

        newX = Math.round(newX / runtimeConfig.public.intervalWidth) * runtimeConfig.public.intervalWidth
        newY = Math.round(newY / runtimeConfig.public.intervalHeight) * runtimeConfig.public.intervalHeight

        const containerRect = container.getBoundingClientRect()
        const elementRect = (e.target as HTMLElement).getBoundingClientRect()

        if (newX < 0)
          newX = 0
        else if (newX > containerRect.width - elementRect.width)
          newX = containerRect.width - elementRect.width

        if (newY < 0)
          newY = 0
        else if (newY > containerRect.height - elementRect.height)
          newY = containerRect.height - elementRect.height

        mouse.currentLesson.x = newX
        mouse.currentLesson.y = newY

        baseDate.value.setHours(8)
        baseDate.value.setMinutes(minutes.value)

        mouse.currentLesson.startTime = baseDate.value.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

        const currentGroupIndex = mouse.currentLesson.y! / runtimeConfig.public.intervalHeight
        const newGroupCount = mouse.currentLesson.height! / runtimeConfig.public.intervalHeight
        mouse.currentLesson.groups = scheduler.schedule!.groups.slice(currentGroupIndex, currentGroupIndex + newGroupCount)!
        mouse.currentLesson.groupsIds = mouse.currentLesson?.groups!.map(group => group.id)
      })
    }
  }

  function onDragUp(e: PointerEvent) {
    const target = e.target as HTMLElement
    target.releasePointerCapture(e.pointerId)
    mouse.isDragging = false

    target.removeEventListener('pointermove', onDragMove)
    target.removeEventListener('pointerup', onDragUp)

    mouse.currentLesson = {} as Subject
    baseDate.value = new Date(1970, 0, 1, 8, 0, 0, 0)
  }

  return {
    onDragDown,
    onDragUp,
    onDragMove,
  }
}
